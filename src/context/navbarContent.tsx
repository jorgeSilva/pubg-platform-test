'use client'

import { IUser } from "@/app/[id]/page";
import { IClan } from "@/components/player/Player";
import React from "react";

type INavbar = {
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setClan: React.Dispatch<React.SetStateAction<IClan | null>>;
  setNickname: React.Dispatch<React.SetStateAction<string | null>>;
  setButtonNavbarActive: React.Dispatch<React.SetStateAction<string | null>>;
  setErro: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean | null>>;
  nickname: string | null;
  clan: IClan | null;
  user: IUser | null;
  buttonNavbarActive: string | null;
  erro: string | null;
  loading: boolean | null;
}

const NavbarContext = React.createContext<INavbar | null>(null)

export const useProviderNavbar = () => {
  const context = React.useContext(NavbarContext)
  if(context === null) throw new Error("useContext deve estar dentro do Provider")
  return context
}

export const NavbarProvider = ({children}: React.PropsWithChildren) => {

  const [nickname, setNickname] = React.useState<string | null>(null)
  const [user, setUser] = React.useState<IUser | null>(null)
  const [erro, setErro] = React.useState<string | null>(null)
  const [buttonNavbarActive, setButtonNavbarActive] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState<boolean | null>(null)
  const [clan, setClan] = React.useState<IClan | null>(null)
  
  return <NavbarContext.Provider value={{
    setUser, 
    setClan,
    setNickname, 
    setButtonNavbarActive,
    setErro,
    setLoading,
    nickname, 
    clan,
    user,
    buttonNavbarActive,
    erro,
    loading
  }}>
    {children}
  </NavbarContext.Provider>
}