'use client'

import { useProviderNavbar } from "@/context/navbarContent";
import React from "react";
import PlayerComponent from "@/components/player/Player";
import PreHomeComponent from "@/components/prehome/PreHome";
import style from './style.module.css'
import StatsComponent from "@/components/stats/Stats";
import WeaponComponent from "@/components/weapons/Weapons";
import PlayedComponent from "@/components/played/Played";

export default function Home() {
  const { user, buttonNavbarActive, erro } = useProviderNavbar()

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
            <>
            {
              (
                buttonNavbarActive === 'estatisticas' &&
                <StatsComponent/>
              )
              ||
              (
                buttonNavbarActive === 'armas' &&
                <WeaponComponent/>
              )
              ||
              (
                buttonNavbarActive === 'partidas' &&
                <PlayedComponent/>
              )
              ||
              (
                <PlayerComponent user={user}/>
              )
            }
            </>
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
