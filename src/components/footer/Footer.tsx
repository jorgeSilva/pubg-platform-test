import Image from 'next/image'
import style from './style.module.css'
import PUBGSTATS from "../../../assets/icons/PUBG STATS.svg"
import IMGFooter from "../../../assets/icons/footer.png"

export default function FooterComponenet(){
  return(
    <footer className={style.footer_content}>
      <div className={style.footer_content_img}>
      </div>
      <div className={style.footer_content_text}>
        <Image
          className={style.logo}
          src={PUBGSTATS}
          width={140}
          height={15}
          alt="PUBG STATS logo"
          priority
        />
        <p>©️  Alguns direitos reservados à SysTech</p>
      </div>
    </footer>
  )
}