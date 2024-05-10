'use client'

import style from './style.module.css'
import IconPUBG from "../../../assets/icons/PUBG_Icon_Blackicons.svg"
import Image from 'next/image'

export default function PreHomeComponent(erro?: { erro: string | null}){

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
        erro?.erro ?
        <p>{erro.erro}</p>
        :
        <ul className={style.prehome_ul}>
          <p>Para que você veja seus atributos é necessário seguir a seguinte ordem: </p>
          <li className={style.prehome_li}>Informar o Nickname no campo de busca logo a cima</li>
          <li className={style.prehome_li}>Escolher alguma opção após informar o nickname</li>
        </ul>
      }
    </section>
  )
}