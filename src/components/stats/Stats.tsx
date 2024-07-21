'use client'

import { fetchApiPubgStats } from "@/actions/fetch-api-pubg-stats"
import { IStatsFormt } from "@/app/[id]/page"
import { useProviderNavbar } from "@/context/navbarContent"
import { handleDias, handleMetros, handleMinutos, formatNumber } from "@/utils/functions"
import React from "react"
import style from './style.module.css'
import ErrorUtils from "@/utils/Error"
import IconArrowBottom from '@/../assets/icons/Path (Stroke)icons.svg'
import Image from "next/image"

export default function StatsComponent(){
  const [isSelectFocoused, setIsSelectFocoused] = React.useState<boolean>(false)
  const [stats, setStats] = React.useState<IStatsFormt | null>(null)
  const [modo, setModo] = React.useState('')
  const { setLoading, setErro, user, loading, erro } = useProviderNavbar()

  const handleStats = async () => {
    setLoading(true)

    if(!user){
      return setErro("Usuário nulo")
    }

    try{
      const stats = await fetchApiPubgStats(user.data[0].id, user.data[0].attributes.shardId)
      if(stats){
        const valueResponse: any = Object.values(stats.data.attributes.gameModeStats)

        return setStats({
          'duo': valueResponse[0],
          'duo_fpp': valueResponse[1],
          'solo': valueResponse[2],
          'solo_fpp': valueResponse[3],
          'squad': valueResponse[4],
          'squad_fpp': valueResponse[5]
        })
      }
    }catch(err){
      setLoading(false)
      setErro("Algum erro no try")
    }finally{
      setLoading(false)
    }
  }

  React.useEffect(() => {
    handleStats()
  }, [user])

  return (
    <section>
      {
        stats && erro === null ?
        <div className={`${style.stats_content}`}>
          <div className={style.stats_content_search}>
            <select onFocus={() => setIsSelectFocoused(true)} onBlur={() => setIsSelectFocoused(false)} className={`${style.navbar_search_input} input`} name="modo" id="modo" onChange={({target}) => {
              setModo(target.value)
            }}>
              <option id="modo" value={'apresentacao'}>Modo de Jogo</option>
              <option id="modo" value={'solo'}>Solo TPP</option>
              <option id="modo" value={'solo_fpp'}>Solo FPP</option>
              <option id="modo" value={'duo'}>Duo TPP</option>
              <option id="modo" value={'duo_fpp'}>Duo FPP</option>
              <option id="modo" value={'squad'}>Squad TPP</option>
              <option id="modo" value={'squad_fpp'}>Squad FPP</option>
            </select>
            <span className={style.navbar_search_content_span}>
              <Image 
                className={`${style.navbar_search_icon} ${isSelectFocoused ? style.navbar_search_icon_active : style.navbar_search_icon_disable}`}
                src={IconArrowBottom}
                width={12}
                height={12}
                alt="Icone estatistica pubg"
                priority
              />
            </span>
          </div>

            {
              (
                modo === "solo_fpp" &&
                <div className="content_stats">
                  <div className={style.stats_offensive}>
                    <h4>Estátisticas ofensivas</h4>
                    <p> Nocautes: {formatNumber(stats.solo_fpp.dBNOs)}</p>
                    <p> Mortes: {formatNumber(stats.solo_fpp.kills)}</p>
                    <p> Assistencias: {formatNumber(stats.solo_fpp.assists)}</p>
                    <p> Dano causado: {formatNumber(stats.solo_fpp.damageDealt)}</p>
                    <p> Tiros na cabeça: {formatNumber(stats.solo_fpp.headshotKills)}</p>
                    <p> Morte mais longa: {formatNumber(stats.solo_fpp.longestKill)}m</p> 
                    <p> N° mortes em uma partida: {formatNumber(stats.solo_fpp.roundMostKills)}</p>
                    <p> Maior sequencia de mortes: {formatNumber(stats.solo_fpp.maxKillStreaks)}</p>
                    <p> Mortes causadas por veiculos: {formatNumber(stats.solo_fpp.roadKills)}</p>
                    <p> N° armas adqueridas: {formatNumber(stats.solo_fpp.weaponsAcquired)}</p>
                    <p> N° mortes ultimo dia jogado: {formatNumber(stats.solo_fpp.dailyKills)}</p>
                    <p> N° mortes ultima semana jogada: {formatNumber(stats.solo_fpp.weeklyKills)}</p>
                  </div>

                  <div className={style.stats_survival}>
                    <h4>Sobrevivencia jogador</h4>
                    <p> Dias: {formatNumber(stats.solo_fpp.days)}</p>
                    <p> Partidas disputadas: {formatNumber(stats.solo_fpp.roundsPlayed)}</p>
                    <p> Partidas perdidas: {formatNumber(stats.solo_fpp.losses)}</p>
                    <p> Vitórias: {formatNumber(stats.solo_fpp.wins)}</p>
                    <p> Tempo de sobrevivencia: {handleDias(stats.solo_fpp.timeSurvived)}</p>
                    <p> Maior tempo de sobrevivencia durante uma partida: {handleMinutos(stats.solo_fpp.longestTimeSurvived)}</p>
                    <p> Vitórias do ultimo dia jogado: {stats.solo_fpp.dailyWins}</p>
                    <p> Vitórias durante a ultima semana jogada: {stats.solo_fpp.weeklyWins}</p>
                    <p> Top 10: {formatNumber(stats.solo_fpp.top10s)}</p>
                  </div>

                  <div className={style.stats_healer}>
                    <h4>Curandeiro</h4>
                    <p> Itens de cura utilizados: {formatNumber(stats.solo_fpp.heals)}</p>
                    <p> Itens de reforço utilizados (Famoso birico): {formatNumber(stats.solo_fpp.boosts)}</p>
                    <p> Reviveu companheiros: {formatNumber(stats.solo_fpp.revives)}</p>
                  </div>

                  <div className={style.stats_distances}>
                    <h4>Distancias</h4>
                    <p> Distancia percorrida a pé: {handleMetros(stats.solo_fpp.walkDistance)}</p>
                    <p> Distancia percorrida de carro: {handleMetros(stats.solo_fpp.rideDistance)}</p>
                    <p> Distancia percorrida enquanto nadava: {handleMetros(stats.solo_fpp.swimDistance)}</p>
                    <p> Veiculos destruidos: {formatNumber(stats.solo_fpp.vehicleDestroys)}</p>
                  </div>

                  <div className={style.stats_friends}>
                    <h4>Conteudo para os amigos</h4>
                    <p> Suicidios: {formatNumber(stats.solo_fpp.suicides)}</p>
                    <p> Vezes que matou um colega de equipe: {formatNumber(stats.solo_fpp.teamKills)}</p>
                  </div>
                </div>
              )
              ||
              (
                modo === "solo" &&
                <div className="content_stats">
                  <div className={style.stats_offensive}>
                    <h4>Estátisticas ofensivas</h4>
                    <p> Nocautes: {formatNumber(stats.solo.dBNOs)}</p>
                    <p> Mortes: {formatNumber(stats.solo.kills)}</p>
                    <p> Assistencias: {formatNumber(stats.solo.assists)}</p>
                    <p> Dano causado: {formatNumber(stats.solo.damageDealt)}</p>
                    <p> Tiros na cabeça: {formatNumber(stats.solo.headshotKills)}</p>
                    <p> Morte mais longa: {formatNumber(stats.solo.longestKill)}m</p> 
                    <p> N° mortes em uma partida: {formatNumber(stats.solo.roundMostKills)}</p>
                    <p> Maior sequencia de mortes: {formatNumber(stats.solo.maxKillStreaks)}</p>
                    <p> Mortes causadas por veiculos: {formatNumber(stats.solo.roadKills)}</p>
                    <p> N° armas adqueridas: {formatNumber(stats.solo.weaponsAcquired)}</p>
                    <p> N° mortes ultimo dia jogado: {formatNumber(stats.solo.dailyKills)}</p>
                    <p> N° mortes ultima semana jogada: {formatNumber(stats.solo.weeklyKills)}</p>
                  </div>

                  <div className={style.stats_survival}>
                    <h4>Sobrevivencia jogador</h4>
                    <p> Dias: {formatNumber(stats.solo.days)}</p>
                    <p> Partidas disputadas: {formatNumber(stats.solo.roundsPlayed)}</p>
                    <p> Partidas perdidas: {formatNumber(stats.solo.losses)}</p>
                    <p> Vitórias: {formatNumber(stats.solo.wins)}</p>
                    <p> Tempo de sobrevivencia: {handleDias(stats.solo.timeSurvived)}</p>
                    <p> Maior tempo de sobrevivencia durante uma partida: {handleMinutos(stats.solo.longestTimeSurvived)}</p>
                    <p> Vitórias do ultimo dia jogado: {stats.solo.dailyWins}</p>
                    <p> Vitórias durante a ultima semana jogada: {stats.solo.weeklyWins}</p>
                    <p> Top 10: {formatNumber(stats.solo.top10s)}</p>
                  </div>

                  <div className={style.stats_healer}>
                    <h4>Curandeiro</h4>
                    <p> Itens de cura utilizados: {formatNumber(stats.solo.heals)}</p>
                    <p> Itens de reforço utilizados (Famoso birico): {formatNumber(stats.solo.boosts)}</p>
                    <p> Reviveu companheiros: {formatNumber(stats.solo.revives)}</p>
                  </div>

                  <div className={style.stats_distances}>
                    <h4>Distancias</h4>
                    <p> Distancia percorrida a pé: {handleMetros(stats.solo.walkDistance)}</p>
                    <p> Distancia percorrida de carro: {handleMetros(stats.solo.rideDistance)}</p>
                    <p> Distancia percorrida enquanto nadava: {handleMetros(stats.solo.swimDistance)}</p>
                    <p> Veiculos destruidos: {formatNumber(stats.solo.vehicleDestroys)}</p>
                  </div>

                  <div className={style.stats_friends}>
                    <h4>Conteudo para os amigos</h4>
                    <p> Suicidios: {formatNumber(stats.solo.suicides)}</p>
                    <p> Vezes que matou um colega de equipe: {formatNumber(stats.solo.teamKills)}</p>
                  </div>
                </div>
              )
              ||
              (
                modo === "duo_fpp" &&
                <div className="content_stats">
                  <div className={style.stats_offensive}>
                    <h4>Estátisticas ofensivas</h4>
                    <p> Nocautes: {formatNumber(stats.duo_fpp.dBNOs)}</p>
                    <p> Mortes: {formatNumber(stats.duo_fpp.kills)}</p>
                    <p> Assistencias: {formatNumber(stats.duo_fpp.assists)}</p>
                    <p> Dano causado: {formatNumber(stats.duo_fpp.damageDealt)}</p>
                    <p> Tiros na cabeça: {formatNumber(stats.duo_fpp.headshotKills)}</p>
                    <p> Morte mais longa: {formatNumber(stats.duo_fpp.longestKill)}m</p> 
                    <p> N° mortes em uma partida: {formatNumber(stats.duo_fpp.roundMostKills)}</p>
                    <p> Maior sequencia de mortes: {formatNumber(stats.duo_fpp.maxKillStreaks)}</p>
                    <p> Mortes causadas por veiculos: {formatNumber(stats.duo_fpp.roadKills)}</p>
                    <p> N° armas adqueridas: {formatNumber(stats.duo_fpp.weaponsAcquired)}</p>
                    <p> N° mortes ultimo dia jogado: {formatNumber(stats.duo_fpp.dailyKills)}</p>
                    <p> N° mortes ultima semana jogada: {formatNumber(stats.duo_fpp.weeklyKills)}</p>
                  </div>

                  <div className={style.stats_survival}>
                    <h4>Sobrevivencia jogador</h4>
                    <p> Dias: {formatNumber(stats.duo_fpp.days)}</p>
                    <p> Partidas disputadas: {formatNumber(stats.duo_fpp.roundsPlayed)}</p>
                    <p> Partidas perdidas: {formatNumber(stats.duo_fpp.losses)}</p>
                    <p> Vitórias: {formatNumber(stats.duo_fpp.wins)}</p>
                    <p> Tempo de sobrevivencia: {handleDias(stats.duo_fpp.timeSurvived)}</p>
                    <p> Maior tempo de sobrevivencia durante uma partida: {handleMinutos(stats.duo_fpp.longestTimeSurvived)}</p>
                    <p> Vitórias do ultimo dia jogado: {stats.duo_fpp.dailyWins}</p>
                    <p> Vitórias durante a ultima semana jogada: {stats.duo_fpp.weeklyWins}</p>
                    <p> Top 10: {formatNumber(stats.duo_fpp.top10s)}</p>
                  </div>

                  <div className={style.stats_healer}>
                    <h4>Curandeiro</h4>
                    <p> Itens de cura utilizados: {formatNumber(stats.duo_fpp.heals)}</p>
                    <p> Itens de reforço utilizados (Famoso birico): {formatNumber(stats.duo_fpp.boosts)}</p>
                    <p> Reviveu companheiros: {formatNumber(stats.duo_fpp.revives)}</p>
                  </div>

                  <div className={style.stats_distances}>
                    <h4>Distancias</h4>
                    <p> Distancia percorrida a pé: {handleMetros(stats.duo_fpp.walkDistance)}</p>
                    <p> Distancia percorrida de carro: {handleMetros(stats.duo_fpp.rideDistance)}</p>
                    <p> Distancia percorrida enquanto nadava: {handleMetros(stats.duo_fpp.swimDistance)}</p>
                    <p> Veiculos destruidos: {formatNumber(stats.duo_fpp.vehicleDestroys)}</p>
                  </div>

                  <div className={style.stats_friends}>
                    <h4>Conteudo para os amigos</h4>
                    <p> Suicidios: {formatNumber(stats.duo_fpp.suicides)}</p>
                    <p> Vezes que matou um colega de equipe: {formatNumber(stats.duo_fpp.teamKills)}</p>
                  </div>
                </div>
              )
              ||
              (
                modo === "duo" &&
                <div className="content_stats">
                  <div className={style.stats_offensive}>
                    <h4>Estátisticas ofensivas</h4>
                    <p> Nocautes: {formatNumber(stats.duo.dBNOs)}</p>
                    <p> Mortes: {formatNumber(stats.duo.kills)}</p>
                    <p> Assistencias: {formatNumber(stats.duo.assists)}</p>
                    <p> Dano causado: {formatNumber(stats.duo.damageDealt)}</p>
                    <p> Tiros na cabeça: {formatNumber(stats.duo.headshotKills)}</p>
                    <p> Morte mais longa: {formatNumber(stats.duo.longestKill)}m</p> 
                    <p> N° mortes em uma partida: {formatNumber(stats.duo.roundMostKills)}</p>
                    <p> Maior sequencia de mortes: {formatNumber(stats.duo.maxKillStreaks)}</p>
                    <p> Mortes causadas por veiculos: {formatNumber(stats.duo.roadKills)}</p>
                    <p> N° armas adqueridas: {formatNumber(stats.duo.weaponsAcquired)}</p>
                    <p> N° mortes ultimo dia jogado: {formatNumber(stats.duo.dailyKills)}</p>
                    <p> N° mortes ultima semana jogada: {formatNumber(stats.duo.weeklyKills)}</p>
                  </div>

                  <div className={style.stats_survival}>
                    <h4>Sobrevivencia jogador</h4>
                    <p> Dias: {formatNumber(stats.duo.days)}</p>
                    <p> Partidas disputadas: {formatNumber(stats.duo.roundsPlayed)}</p>
                    <p> Partidas perdidas: {formatNumber(stats.duo.losses)}</p>
                    <p> Vitórias: {formatNumber(stats.duo.wins)}</p>
                    <p> Tempo de sobrevivencia: {handleDias(stats.duo.timeSurvived)}</p>
                    <p> Maior tempo de sobrevivencia durante uma partida: {handleMinutos(stats.duo.longestTimeSurvived)}</p>
                    <p> Vitórias do ultimo dia jogado: {stats.duo.dailyWins}</p>
                    <p> Vitórias durante a ultima semana jogada: {stats.duo.weeklyWins}</p>
                    <p> Top 10: {formatNumber(stats.duo.top10s)}</p>
                  </div>

                  <div className={style.stats_healer}>
                    <h4>Curandeiro</h4>
                    <p> Itens de cura utilizados: {formatNumber(stats.duo.heals)}</p>
                    <p> Itens de reforço utilizados (Famoso birico): {formatNumber(stats.duo.boosts)}</p>
                    <p> Reviveu companheiros: {formatNumber(stats.duo.revives)}</p>
                  </div>

                  <div className={style.stats_distances}>
                    <h4>Distancias</h4>
                    <p> Distancia percorrida a pé: {handleMetros(stats.duo.walkDistance)}</p>
                    <p> Distancia percorrida de carro: {handleMetros(stats.duo.rideDistance)}</p>
                    <p> Distancia percorrida enquanto nadava: {handleMetros(stats.duo.swimDistance)}</p>
                    <p> Veiculos destruidos: {formatNumber(stats.duo.vehicleDestroys)}</p>
                  </div>

                  <div className={style.stats_friends}>
                    <h4>Conteudo para os amigos</h4>
                    <p> Suicidios: {formatNumber(stats.duo.suicides)}</p>
                    <p> Vezes que matou um colega de equipe: {formatNumber(stats.duo.teamKills)}</p>
                  </div>
                </div>
              )
              ||
              (
                modo === "squad_fpp" &&
                <div className="content_stats">
                  
                  <div className={`${style.stats_offensive} offensive`}>
                    <h4>Estátisticas ofensivas</h4>
                    <p> Nocautes: {formatNumber(stats.squad_fpp.dBNOs)}</p>
                    <p> Mortes: {formatNumber(stats.squad_fpp.kills)}</p>
                    <p> Assistencias: {formatNumber(stats.squad_fpp.assists)}</p>
                    <p> Dano causado: {formatNumber(stats.squad_fpp.damageDealt)}</p>
                    <p> Tiros na cabeça: {formatNumber(stats.squad_fpp.headshotKills)}</p>
                    <p> Morte mais longa: {formatNumber(stats.squad_fpp.longestKill)}m</p> 
                    <p> N° mortes em uma partida: {formatNumber(stats.squad_fpp.roundMostKills)}</p>
                    <p> Maior sequencia de mortes: {formatNumber(stats.squad_fpp.maxKillStreaks)}</p>
                    <p> Mortes causadas por veiculos: {formatNumber(stats.squad_fpp.roadKills)}</p>
                    <p> N° armas adqueridas: {formatNumber(stats.squad_fpp.weaponsAcquired)}</p>
                    <p> N° mortes ultimo dia jogado: {formatNumber(stats.squad_fpp.dailyKills)}</p>
                    <p> N° mortes ultima semana jogada: {formatNumber(stats.squad_fpp.weeklyKills)}</p>
                  </div>

                  <div className={`${style.stats_survival} survival`}>
                    <h4>Sobrevivencia jogador</h4>
                    <p> Dias: {formatNumber(stats.squad_fpp.days)}</p>
                    <p> Partidas disputadas: {formatNumber(stats.squad_fpp.roundsPlayed)}</p>
                    <p> Partidas perdidas: {formatNumber(stats.squad_fpp.losses)}</p>
                    <p> Vitórias: {formatNumber(stats.squad_fpp.wins)}</p>
                    <p> Tempo de sobrevivencia: {handleDias(stats.squad_fpp.timeSurvived)}</p>
                    <p> Maior tempo de sobrevivencia durante uma partida: {handleMinutos(stats.squad_fpp.longestTimeSurvived)}</p>
                    <p> Vitórias do ultimo dia jogado: {stats.squad_fpp.dailyWins}</p>
                    <p> Vitórias durante a ultima semana jogada: {stats.squad_fpp.weeklyWins}</p>
                    <p> Top 10: {formatNumber(stats.squad_fpp.top10s)}</p>
                  </div>

                  <div className={`${style.stats_healer} healer`}>
                    <h4>Curandeiro</h4>
                    <p> Itens de cura utilizados: {formatNumber(stats.squad_fpp.heals)}</p>
                    <p> Itens de reforço utilizados (Famoso birico): {formatNumber(stats.squad_fpp.boosts)}</p>
                    <p> Reviveu companheiros: {formatNumber(stats.squad_fpp.revives)}</p>
                  </div>

                  <div className={`${style.stats_distances} distances`}>
                    <h4>Distancias</h4>
                    <p> Distancia percorrida a pé: {handleMetros(stats.squad_fpp.walkDistance)}</p>
                    <p> Distancia percorrida de carro: {handleMetros(stats.squad_fpp.rideDistance)}</p>
                    <p> Distancia percorrida enquanto nadava: {handleMetros(stats.squad_fpp.swimDistance)}</p>
                    <p> Veiculos destruidos: {formatNumber(stats.squad_fpp.vehicleDestroys)}</p>
                  </div>

                  <div className={`${style.stats_friends} friends`}>
                    <h4>Conteudo para os amigos</h4>
                    <p> Suicidios: {formatNumber(stats.squad_fpp.suicides)}</p>
                    <p> Vezes que matou um colega de equipe: {formatNumber(stats.squad_fpp.teamKills)}</p>
                  </div>
                </div>
              )
              ||
              (
                modo === "squad" &&
                <div className="content_stats">
                  <div className={style.stats_offensive}>
                    <h4>Estátisticas ofensivas</h4>
                    <p> Nocautes: {formatNumber(stats.squad.dBNOs)}</p>
                    <p> Mortes: {formatNumber(stats.squad.kills)}</p>
                    <p> Assistencias: {formatNumber(stats.squad.assists)}</p>
                    <p> Dano causado: {formatNumber(stats.squad.damageDealt)}</p>
                    <p> Tiros na cabeça: {formatNumber(stats.squad.headshotKills)}</p>
                    <p> Morte mais longa: {formatNumber(stats.squad.longestKill)}m</p> 
                    <p> N° mortes em uma partida: {formatNumber(stats.squad.roundMostKills)}</p>
                    <p> Maior sequencia de mortes: {formatNumber(stats.squad.maxKillStreaks)}</p>
                    <p> Mortes causadas por veiculos: {formatNumber(stats.squad.roadKills)}</p>
                    <p> N° armas adqueridas: {formatNumber(stats.squad.weaponsAcquired)}</p>
                    <p> N° mortes ultimo dia jogado: {formatNumber(stats.squad.dailyKills)}</p>
                    <p> N° mortes ultima semana jogada: {formatNumber(stats.squad.weeklyKills)}</p>
                  </div>

                  <div className={style.stats_survival}>
                    <h4>Sobrevivencia jogador</h4>
                    <p> Dias: {formatNumber(stats.squad.days)}</p>
                    <p> Partidas disputadas: {formatNumber(stats.squad.roundsPlayed)}</p>
                    <p> Partidas perdidas: {formatNumber(stats.squad.losses)}</p>
                    <p> Vitórias: {formatNumber(stats.squad.wins)}</p>
                    <p> Tempo de sobrevivencia: {handleDias(stats.squad.timeSurvived)}</p>
                    <p> Maior tempo de sobrevivencia durante uma partida: {handleMinutos(stats.squad.longestTimeSurvived)}</p>
                    <p> Vitórias do ultimo dia jogado: {stats.squad.dailyWins}</p>
                    <p> Vitórias durante a ultima semana jogada: {stats.squad.weeklyWins}</p>
                    <p> Top 10: {formatNumber(stats.squad.top10s)}</p>
                  </div>

                  <div className={style.stats_healer}>
                    <h4>Curandeiro</h4>
                    <p> Itens de cura utilizados: {formatNumber(stats.squad.heals)}</p>
                    <p> Itens de reforço utilizados (Famoso birico): {formatNumber(stats.squad.boosts)}</p>
                    <p> Reviveu companheiros: {formatNumber(stats.squad.revives)}</p>
                  </div>

                  <div className={style.stats_distances}>
                    <h4>Distancias</h4>
                    <p> Distancia percorrida a pé: {handleMetros(stats.squad.walkDistance)}</p>
                    <p> Distancia percorrida de carro: {handleMetros(stats.squad.rideDistance)}</p>
                    <p> Distancia percorrida enquanto nadava: {handleMetros(stats.squad.swimDistance)}</p>
                    <p> Veiculos destruidos: {formatNumber(stats.squad.vehicleDestroys)}</p>
                  </div>

                  <div className={style.stats_friends}>
                    <h4>Conteudo para os amigos</h4>
                    <p> Suicidios: {formatNumber(stats.squad.suicides)}</p>
                    <p> Vezes que matou um colega de equipe: {formatNumber(stats.squad.teamKills)}</p>
                  </div>
                  
                </div>
              )
            }
        </div>
        :
        <>
          {
            erro && <ErrorUtils error={erro} />
          }
        </>
      }
    </section>
  )
}