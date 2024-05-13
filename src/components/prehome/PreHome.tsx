'use client'

import style from './style.module.css'
import IconPUBG from "../../../assets/icons/PUBG_Icon_Blackicons.svg"
import Image from 'next/image'
import ErrorUtils from '@/utils/Error'
import { useProviderNavbar } from '@/context/navbarContent'
import { font_title } from '@/app/fonts'

export default function PreHomeComponent(erro?: { erro: string | null}){

  const { loading } = useProviderNavbar()

  return (
    <section className={style.prehome_container}>
      <Image
        className={style.prehome_icon}
        alt='Icone PUBG'
        width={79}
        height={45}
        src={IconPUBG}
      />
      
      {
        loading ?
        <span className="loader"></span>
        :
        (
          <>
            {
              erro?.erro ?
              <ErrorUtils error={erro.erro}/>
              :
              <ul className={style.prehome_ul}>
                <p className={font_title.className}>Para que você veja seus atributos é necessário seguir a seguinte ordem: </p>
                <li className={style.prehome_li}>Informar o Nickname no campo de busca logo a cima</li>
                <li className={style.prehome_li}>Escolher alguma opção após informar o nickname</li>
              </ul>
            }
          </>
        )
      }
    </section>
  )
}