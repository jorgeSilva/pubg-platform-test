'use client'

import { IUser } from "@/app/[id]/page";
import style from "./style.module.css"
import React from "react";
import { fetchApiPubgUserClan } from "@/actions/fetch-api-pubg-stats";
import { useProviderNavbar } from "@/context/navbarContent";
import ErrorUtils from "@/utils/Error";

export type IClan = {
  data: {
    attributes:{
      clanLevel: number
      clanMemberCount: number
      clanName: string
      clanTag: string
    }
    id: string
    type: string
  },
  links: {self: string},
  meta:{}
}

export default function PlayerComponent(user: {user: IUser | null}){
  const { setClan, setErro, setLoading, clan, erro, loading } = useProviderNavbar()
  
  const userClan = async () => {

    if(!user.user?.data[0].attributes.shardId || !user.user?.data[0].attributes.clanId){
      return setErro('Usuário ou clã indefinido')
    }
    setLoading(true)
    try{ 
      const response: IClan = await fetchApiPubgUserClan(user.user?.data[0].attributes.clanId, user.user?.data[0].attributes.shardId)
      setClan(response)
    }catch(error){
      setLoading(false)
      setErro(erro)
    }finally{
      setLoading(false)
    }
  }

  React.useEffect(() => {
    userClan()
  }, [user.user?.data[0].attributes.clanId, user.user?.data[0].attributes.shardId])

  return (
    <>
      {
        (
          erro && <ErrorUtils error={erro}/>
        )
        ||
        (
          loading ?
          <div className={style.player_loader}>
            <span className="loader"></span>
          </div>
          :
          <ul className={style.player_ul}>
            <li className={style.player_name}>
              Nome jogador: {user.user?.data[0].attributes.name}
            </li>
            <li>
              Nome Clã: {clan?.data.attributes.clanName}
            </li>
            <li>
              Tag Clã: {clan?.data.attributes.clanTag}
            </li>
            <li>
              Plataforma: {user.user?.data[0].attributes.shardId}
            </li>
          </ul>
        )
      }
    </>
  )
}