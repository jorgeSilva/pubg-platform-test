'use client'

import { IUser } from "@/app/[id]/page";
import React from "react";

type INavbar = {
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setNickname: React.Dispatch<React.SetStateAction<string | null>>;
  setErro: React.Dispatch<React.SetStateAction<string | null>>;
  nickname: string | null;
  user: IUser | null;
  erro: string | null;
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
  
  return <NavbarContext.Provider value={{
    setUser, 
    setNickname, 
    setErro,
    nickname, 
    user,
    erro
  }}>
    {children}
  </NavbarContext.Provider>
}