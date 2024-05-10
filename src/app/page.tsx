'use client'

import { useProviderNavbar } from "@/context/navbarContent";
import React from "react";
import PlayerComponent from "@/components/player/Player";
import PreHomeComponent from "@/components/prehome/PreHome";
import style from './style.module.css'

export default function Home() {
  const { user, nickname, erro } = useProviderNavbar()

  return (
    <main className={style.home_container}>
      {  
        (
          erro && (
            <PreHomeComponent erro={erro}/>
          )
        )
        ||
        (
          user ?
          (
            <PlayerComponent user={user}/>
          )
          :
          (
            <PreHomeComponent erro={erro}/>
          )
        )
      }
    </main>
  )
}
