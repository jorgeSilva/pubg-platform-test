'use client'

import Image from "next/image"
import style from "./style.module.css"
import PUBGSTATS from "../../../assets/icons/PUBG STATS.svg"
import IconStats from "../../../assets/icons/Subtracticons.svg"
import IconWeapon from "../../../assets/icons/Item_Weapon_HK416_C 1icons.svg"
import IconPlays from "../../../assets/icons/Unionicons.svg"
import IconSearch from "../../../assets/icons/Unionicons-1.svg"
import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, use } from "react"
import Link from "next/link";
import { IUser } from "@/app/[id]/page"
import { fetchApiPubgUser } from "@/actions/fetch-api-pubg-stats"
import { useProviderNavbar } from "@/context/navbarContent"
import { font_title } from "@/app/fonts"
import { useRouter } from "next/router"


export default function NavbarComponenet(){
  const [isInputFocoused, setIsInputFocoused] = React.useState<boolean>(false)
  const statsButton = React.useRef<HTMLButtonElement | null>(null)
  const weaponButton = React.useRef<HTMLButtonElement | null>(null)
  const playButton = React.useRef<HTMLButtonElement | null>(null)
  const nicknameInput = React.useRef<HTMLInputElement | null>(null)

  const { 
    setNickname, 
    setUser,
    setButtonNavbarActive,
    setErro,
    setLoading,
    nickname,
    user,
    erro,
  } = useProviderNavbar()

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({target}) =>{
    setNickname(target.value)
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if(event.currentTarget.id === statsButton.current?.id){
      // Remove class playButton
      playButton.current?.classList.remove("buttonActive")
      playButton.current?.firstElementChild?.classList.remove("spanActive")
      playButton.current?.lastElementChild?.classList.remove("textActive")
      // Remove class weaponButton
      weaponButton.current?.classList.remove("buttonActive")
      weaponButton.current?.firstElementChild?.classList.remove("spanActive")
      weaponButton.current?.lastElementChild?.classList.remove("textActive")
      // set option navbar active
      setButtonNavbarActive(statsButton.current?.id)
      // Add class statsButton
      statsButton.current.classList.add("buttonActive")
      statsButton.current?.firstElementChild?.classList.add("spanActive")
      statsButton.current?.lastElementChild?.classList.add("textActive")

    }else if(event.currentTarget.id === weaponButton.current?.id){
      // Remove class playButton
      playButton.current?.classList.remove("buttonActive")
      playButton.current?.firstElementChild?.classList.remove("spanActive")
      playButton.current?.lastElementChild?.classList.remove("textActive")
      // Remove class statsButton
      statsButton.current?.classList.remove("buttonActive")
      statsButton.current?.firstElementChild?.classList.remove("spanActive")
      statsButton.current?.lastElementChild?.classList.remove("textActive")
      // set option navbar active
      setButtonNavbarActive(weaponButton.current?.id)
      // Add class weaponButton
      weaponButton.current.classList.add("buttonActive")
      weaponButton.current?.firstElementChild?.classList.add("spanActive")
      weaponButton.current?.lastElementChild?.classList.add("textActive")
    }else if(event.currentTarget.id === playButton.current?.id){
      // Remove class weaponButton
      weaponButton.current?.classList.remove("buttonActive")
      weaponButton.current?.firstElementChild?.classList.remove("spanActive")
      weaponButton.current?.lastElementChild?.classList.remove("textActive")
      // set option navbar active
      setButtonNavbarActive(playButton.current?.id)
      // Remove class statsButton
      statsButton.current?.classList.remove("buttonActive")
      statsButton.current?.firstElementChild?.classList.remove("spanActive")
      statsButton.current?.lastElementChild?.classList.remove("textActive")
      // Add class playButton
      playButton.current?.classList.add("buttonActive")
      playButton.current?.firstElementChild?.classList.add("spanActive")
      playButton.current?.lastElementChild?.classList.add("textActive")
    }
  }

  const handleClickAlert: MouseEventHandler<HTMLButtonElement> = () => {
    window.alert("Deve ser passado o nickname para buscar os dados")
  }

  const resetAllClick = () =>{
    window.location.reload()
  }

  const handleDataPlayer = async () => {
    if(!nickname){
      return setErro('Deve passar o nickname')
    }
    
    setLoading(true)
    const response: IUser = await fetchApiPubgUser(nickname)

    if(!response.data){
      setLoading(false)
      setErro('Jogador não encontrado')
      setUser(null)
    }
    if(response.data){
      setLoading(false)
      setErro(null)
      setUser(response)
    }
  }

  return(
    <nav className={style.navbar_content}>
      <Link href="/" onClick={resetAllClick} className={style.navbar_logo}>
        <Image
          className={style.logo}
          src={PUBGSTATS}
          width={180}
          height={20}
          alt="PUBG STATS logo"
          priority
        />
      </Link>
      
      <section className={style.navbar_buttons}>
        {
          nickname ? 
          <>
            <button ref={statsButton} onClick={handleClick} id="estatisticas" className={style.navbar_button_content}>
              <span className={style.navbar_button_content_span}>
                <Image 
                  className={style.navbar_button_icon}
                  src={IconStats}
                  width={12}
                  height={16}
                  alt="Icone estatistica pubg"
                  priority
                />
              </span>
              <p className={`${style.navbar_button_text} ${font_title.className}`}>Estátisticas</p>
            </button>

            <button ref={weaponButton} onClick={handleClick}  id="armas" className={style.navbar_button_content}>
              <span className={style.navbar_button_content_span}>
                <Image 
                  className={style.navbar_button_icon}
                  src={IconWeapon}
                  width={20}
                  height={20}
                  alt="Icone estatistica pubg"
                  priority
                />
              </span>
              <p className={`${style.navbar_button_text} ${font_title.className}`}>Armas</p>
            </button>

            <button ref={playButton} onClick={handleClick} id="partidas" className={style.navbar_button_content}>
              <span className={style.navbar_button_content_span}>
                <Image 
                  className={style.navbar_button_icon}
                  src={IconPlays}
                  width={12}
                  height={16}
                  alt="Icone estatistica pubg"
                  priority
                />
              </span>
              <p className={`${style.navbar_button_text} ${font_title.className}`}>Partidas</p>
            </button>
          </>
          :
          <>
            <button onClick={handleClickAlert} className={style.navbar_button_content}>
              <span className={style.navbar_button_content_span}>
                <Image 
                  className={style.navbar_button_icon}
                  src={IconStats}
                  width={12}
                  height={16}
                  alt="Icone estatistica pubg"
                  priority
                />
              </span>
              <p className={`${style.navbar_button_text} ${font_title.className}`}>Estátisticas</p>
            </button>

            <button onClick={handleClickAlert} className={style.navbar_button_content}>
              <span className={style.navbar_button_content_span}>
                <Image 
                  className={style.navbar_button_icon}
                  src={IconWeapon}
                  width={20}
                  height={20}
                  alt="Icone estatistica pubg"
                  priority
                />
              </span>
              <p className={`${style.navbar_button_text} ${font_title.className}`}>Armas</p>
            </button>

            <button onClick={handleClickAlert} className={style.navbar_button_content}>
              <span className={style.navbar_button_content_span}>
                <Image 
                  className={style.navbar_button_icon}
                  src={IconPlays}
                  width={12}
                  height={16}
                  alt="Icone estatistica pubg"
                  priority
                />
              </span>
              <p className={`${style.navbar_button_text} ${font_title.className}`}>Partidas</p>
            </button>
          </>
        }
      </section>

      <section className={style.navbar_search_content}>
        <input ref={nicknameInput} className={style.navbar_search_input} type="text" onChange={handleChange} onFocus={() => setIsInputFocoused(true)} onBlur={() => setIsInputFocoused(false)} placeholder="Nickname.."/>
        
        <button onClick={handleDataPlayer} className={`${style.navbar_search_content_span} ${isInputFocoused && 'focus'}`}>
          <span className={style.navbar_search_content_span_icon}>
            <Image 
              className={style.navbar_search_icon}
              src={IconSearch}
              width={16}
              height={16}
              alt="Icone estatistica pubg"
              priority
            />
          </span>
        </button>
      </section>
    </nav>
  )
}