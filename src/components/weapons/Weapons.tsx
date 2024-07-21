import React from "react";
import { IUser, IWeapons } from "@/app/[id]/page";
import { fetchApiPubgMastery } from "@/actions/fetch-api-pubg-stats";
import Image from "next/image"
import IconArrowBottom from '@/../assets/icons/Path (Stroke)icons.svg'
import style from './style.module.css'
import { formatNumber } from "@/utils/functions";



export default function WeaponComponent(params: {user: IUser}){
  const [error, setError] = React.useState<{msg: string, fetch: string} | null>(null)
  const [mastery, setMastery] = React.useState<IWeapons[] | null>(null)
  const [modoWeapon, setModoWeapon] = React.useState('')
  const [isSelectFocoused, setIsSelectFocoused] = React.useState<boolean>(false)
  
  async function handleWeapons(){
      try{
      const response: any = await fetchApiPubgMastery(params.user.data[0].id)
      const key: any = Object.keys(response.data.attributes.weaponSummaries)
      const value: any = Object.keys(response.data.attributes.weaponSummaries).map(chave => response.data.attributes.weaponSummaries[chave])
      
      const armasComEstatisticas = key.map((nome: any, index: number) => {
          return {
              name: nome.split("_")[2],
              weapon: value[index]
          };
      });

      setMastery(armasComEstatisticas)
    }catch(err){
      return setError({msg: 'Erro ao encontrar usuario', fetch: 'handleWeapons'})
    }
  }

  React.useEffect(() => {
    handleWeapons()
  }, [])
  
  return (
    <>
      <section className={style.container__weapons}>
        <div>
          {
            mastery && error === null ?
              <>
                <div className={style.stats_content_search}>
                  <select name="modoWeapon" id="modoWeapon" className={`${style.weapons_search_input} input`} onFocus={() => setIsSelectFocoused(true)} onBlur={() => setIsSelectFocoused(false)} onChange={({target}) => {
                    setModoWeapon(target.value)
                  }}>
                    <option id="modoWeapon" value={'CompetitiveStatsTotal'}>Estatistica modo ranked</option>
                    <option id="modoWeapon" value={'OfficialStatsTotal'}>Estatistica modo normal</option>
                  </select>
                  <span className={style.weapons_search_content_span}>
                    <Image 
                      className={`${style.weapons_search_icon} ${isSelectFocoused ? style.weapons_search_icon_active : style.weapons_search_icon_disable}`}
                      src={IconArrowBottom}
                      width={12}
                      height={12}
                      alt="Icone estatistica pubg"
                      priority
                    />
                  </span>
                </div>

                <div className={style.content_weapons}>
                  { 
                    (
                      modoWeapon === "CompetitiveStatsTotal" &&
                        mastery.map(value => (
                          <div key={value.name} className={style.content_card_weapon}>
                          <div className={style.content_img_info_card}>
                            <div className={style.img_weapons}>
                              <Image 
                                src={`/assets/weapons/Item_Weapon_${value.name}_C.png`}
                                width={72}
                                height={72}
                                alt="Imagem arma pubg"
                                priority
                              />
                            </div>
                            <div>
                              <h4>{value.name}</h4>
                              <p>Nível da arma: {formatNumber(value.weapon.TierCurrent)}</p>
                              <p>XP do nível: {formatNumber(value.weapon.XPTotal)}</p>
                              <p>N° mortes em 1 partida: {formatNumber(value.weapon.CompetitiveStatsTotal.MostKillsInAGame)}</p>
                            </div>
                          </div>
                          <p>Nocauteados: {formatNumber(value.weapon.CompetitiveStatsTotal.Groggies)}</p>
                          <p>Mortes: {formatNumber(value.weapon.CompetitiveStatsTotal.Kills)}</p>
                          <p>Dano causado: {formatNumber(value.weapon.CompetitiveStatsTotal.DamagePlayer)}</p>
                          <p>Tiros na cabeça: {formatNumber(value.weapon.CompetitiveStatsTotal.HeadShots)}</p>
                          <p>Morte mais longa: {formatNumber(value.weapon.CompetitiveStatsTotal.LongestKill)}</p>
                          <p>Mais derrotas em uma partida: {formatNumber(value.weapon.CompetitiveStatsTotal.MostDefeatsInAGame)}</p>
                          <p>Derrotas da carreira: {formatNumber(value.weapon.CompetitiveStatsTotal.Defeats)}</p>
                        </div>
                      ))
                    )
                    ||
                    (
                      modoWeapon === "OfficialStatsTotal" &&
                        mastery.map(value => (
                        <div key={value.name} className={style.content_card_weapon}>
                          <div className={style.content_img_info_card}>
                            <div className={style.img_weapons}>
                              <Image 
                                src={`/assets/weapons/Item_Weapon_${value.name}_C.png`}
                                width={72}
                                height={72}
                                alt="Imagem arma pubg"
                                priority
                              />
                            </div>
                            <div>
                              <h4>{value.name}</h4>
                              <p>Nível da arma: {formatNumber(value.weapon.TierCurrent)}</p>
                              <p>XP do nível: {formatNumber(value.weapon.XPTotal)}</p>
                              <p>N° mortes em 1 partida: {formatNumber(value.weapon.OfficialStatsTotal.MostKillsInAGame)}</p>
                            </div>
                          </div>
                          <p>Nocauteados: {formatNumber(value.weapon.OfficialStatsTotal.Groggies)}</p>
                          <p>Mortes: {formatNumber(value.weapon.OfficialStatsTotal.Kills)}</p>
                          <p>Dano causado: {formatNumber(value.weapon.OfficialStatsTotal.DamagePlayer)}</p>
                          <p>Tiros na cabeça: {formatNumber(value.weapon.OfficialStatsTotal.HeadShots)}</p>
                          <p>Morte mais longa: {formatNumber(value.weapon.OfficialStatsTotal.LongestKill)}</p>
                          <p>Mais derrotas em uma partida: {formatNumber(value.weapon.OfficialStatsTotal.MostDefeatsInAGame)}</p>
                          <p>Derrotas da carreira: {formatNumber(value.weapon.OfficialStatsTotal.Defeats)}</p>
                        </div>
                      ))
                    )
                  }
                </div>
              </>
            :
            <>
            {
              error && error.fetch === 'handleWeapons' &&
              <p>{error?.msg}</p>
            }
            </>
          }
        </div>
      </section>
    </>
  )
}