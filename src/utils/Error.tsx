'use client'

import style from './Error.module.css'

export default function ErrorUtils({error}: {error: string}){
  return (
    <div className={style.error_content}>
      <p className={style.error_text}>*{error}*</p>
    </div>
  )
}