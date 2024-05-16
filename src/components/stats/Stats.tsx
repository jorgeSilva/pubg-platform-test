'use client'

import { fetchApiPubgStats } from "@/actions/fetch-api-pubg-stats"
import { IStatsFormt, handleDias, handleMetros, handleMinutos } from "@/app/[id]/page"
import { useProviderNavbar } from "@/context/navbarContent"
import { resourceUsage } from "process"
import React from "react"
import style from './style.module.css'
import ErrorUtils from "@/utils/Error"

export default function StatsComponent(){
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
    <section className={style.stats_container}>
      {
        stats && erro === null ?
        <div className={`${style.stats_content}`}>
          <select className={`${style.stats_input} input`} name="modo" id="modo" onChange={({target}) => {
            setModo(target.value)
          }}>
            <option id="modo" value={'apresentacao'}>Modo de Jogo</option>
            <option id="modo" value={''}></option>
            <option id="modo" value={'solo'}>Solo TPP</option>
            <option id="modo" value={'solo_fpp'}>Solo FPP</option>
            <option id="modo" value={'duo'}>Duo TPP</option>
            <option id="modo" value={'duo_fpp'}>Duo FPP</option>
            <option id="modo" value={'squad'}>Squad TPP</option>
            <option id="modo" value={'squad_fpp'}>Squad FPP</option>
          </select>

            {
              (
                modo === "solo_fpp" &&
                <>
                  <div className={style.stats_offensive}>
                    <h4>Estátisticas ofensivas</h4>
                    <p> Nocautes: {stats.solo_fpp.dBNOs}</p>
                    <p> Mortes: {stats.solo_fpp.kills}</p>
                    <p> Assistencias: {stats.solo_fpp.assists}</p>
                    <p> Dano causado: {stats.solo_fpp.damageDealt.toFixed(0)}</p>
                    <p> Tiros na cabeça: {stats.solo_fpp.headshotKills}</p>
                    <p> Morte mais longa: {stats.solo_fpp.longestKill.toFixed(0)}m</p> 
                    <p> N° mortes em uma partida: {stats.solo_fpp.roundMostKills}</p>
                    <p> Maior sequencia de mortes: {stats.solo_fpp.maxKillStreaks}</p>
                    <p> Mortes causadas por veiculos: {stats.solo_fpp.roadKills}</p>
                    <p> N° armas adqueridas: {stats.solo_fpp.weaponsAcquired}</p>
                    <p> N° mortes ultimo dia jogado: {stats.solo_fpp.dailyKills}</p>
                    <p> N° mortes ultima semana jogada: {stats.solo_fpp.weeklyKills}</p>
                  </div>

                  <div className={style.stats_survival}>
                    <h4>Sobrevivencia jogador</h4>
                    <p> Dias: {stats.solo_fpp.days}</p>
                    <p> Partidas disputadas: {stats.solo_fpp.roundsPlayed}</p>
                    <p> Partidas perdidas: {stats.solo_fpp.losses}</p>
                    <p> Vitórias: {stats.solo_fpp.wins}</p>
                    <p> Tempo de sobrevivencia: {handleDias(stats.solo_fpp.timeSurvived)}</p>
                    <p> Maior tempo de sobrevivencia durante uma partida: {handleMinutos(stats.solo_fpp.longestTimeSurvived)}</p>
                    <p> Vitórias do ultimo dia jogado: {stats.solo_fpp.dailyWins}</p>
                    <p> Vitórias durante a ultima semana jogada: {stats.solo_fpp.weeklyWins}</p>
                    <p> Top 10: {stats.solo_fpp.top10s}</p>
                  </div>

                  <div className={style.stats_healer}>
                    <h4>Curandeiro</h4>
                    <p> Itens de cura utilizados: {stats.solo_fpp.heals}</p>
                    <p> Itens de reforço utilizados (Famoso birico): {stats.solo_fpp.boosts}</p>
                    <p> Reviveu companheiros: {stats.solo_fpp.revives}</p>
                  </div>

                  <div className={style.stats_distances}>
                    <h4>Distancias</h4>
                    <p> Distancia percorrida a pé: {handleMetros(stats.solo_fpp.walkDistance)}</p>
                    <p> Distancia percorrida de carro: {handleMetros(stats.solo_fpp.rideDistance)}</p>
                    <p> Distancia percorrida enquanto nadava: {handleMetros(stats.solo_fpp.swimDistance)}</p>
                    <p> Veiculos destruidos: {stats.solo_fpp.vehicleDestroys}</p>
                  </div>

                  <div className={style.stats_friends}>
                    <h4>Conteudo para os amigos</h4>
                    <p> Suicidios: {stats.solo_fpp.suicides}</p>
                    <p> Vezes que matou um colega de equipe: {stats.solo_fpp.teamKills}</p>
                  </div>
                </>
              )
              ||
              (
                modo === "solo" &&
                <>
                  <div className={style.stats_offensive}>
                    <h4>Estátisticas ofensivas</h4>
                    <p> Nocautes: {stats.solo.dBNOs}</p>
                    <p> Mortes: {stats.solo.kills}</p>
                    <p> Assistencias: {stats.solo.assists}</p>
                    <p> Dano causado: {stats.solo.damageDealt.toFixed(0)}</p>
                    <p> Tiros na cabeça: {stats.solo.headshotKills}</p>
                    <p> Morte mais longa: {stats.solo.longestKill.toFixed(0)}m</p> 
                    <p> N° mortes em uma partida: {stats.solo.roundMostKills}</p>
                    <p> Maior sequencia de mortes: {stats.solo.maxKillStreaks}</p>
                    <p> Mortes causadas por veiculos: {stats.solo.roadKills}</p>
                    <p> N° armas adqueridas: {stats.solo.weaponsAcquired}</p>
                    <p> N° mortes ultimo dia jogado: {stats.solo.dailyKills}</p>
                    <p> N° mortes ultima semana jogada: {stats.solo.weeklyKills}</p>
                  </div>

                  <div className={style.stats_survival}>
                    <h4>Sobrevivencia jogador</h4>
                    <p> Dias: {stats.solo.days}</p>
                    <p> Partidas disputadas: {stats.solo.roundsPlayed}</p>
                    <p> Partidas perdidas: {stats.solo.losses}</p>
                    <p> Vitórias: {stats.solo.wins}</p>
                    <p> Tempo de sobrevivencia: {handleDias(stats.solo.timeSurvived)}</p>
                    <p> Maior tempo de sobrevivencia durante uma partida: {handleMinutos(stats.solo.longestTimeSurvived)}</p>
                    <p> Vitórias do ultimo dia jogado: {stats.solo.dailyWins}</p>
                    <p> Vitórias durante a ultima semana jogada: {stats.solo.weeklyWins}</p>
                    <p> Top 10: {stats.solo.top10s}</p>
                  </div>

                  <div className={style.stats_healer}>
                    <h4>Curandeiro</h4>
                    <p> Itens de cura utilizados: {stats.solo.heals}</p>
                    <p> Itens de reforço utilizados (Famoso birico): {stats.solo.boosts}</p>
                    <p> Reviveu companheiros: {stats.solo.revives}</p>
                  </div>

                  <div className={style.stats_distances}>
                    <h4>Distancias</h4>
                    <p> Distancia percorrida a pé: {handleMetros(stats.solo.walkDistance)}</p>
                    <p> Distancia percorrida de carro: {handleMetros(stats.solo.rideDistance)}</p>
                    <p> Distancia percorrida enquanto nadava: {handleMetros(stats.solo.swimDistance)}</p>
                    <p> Veiculos destruidos: {stats.solo.vehicleDestroys}</p>
                  </div>

                  <div className={style.stats_friends}>
                    <h4>Conteudo para os amigos</h4>
                    <p> Suicidios: {stats.solo.suicides}</p>
                    <p> Vezes que matou um colega de equipe: {stats.solo.teamKills}</p>
                  </div>
                </>
              )
              ||
              (
                modo === "duo_fpp" &&
                <>
                  <div className={style.stats_offensive}>
                    <h4>Estátisticas ofensivas</h4>
                    <p> Nocautes: {stats.duo_fpp.dBNOs}</p>
                    <p> Mortes: {stats.duo_fpp.kills}</p>
                    <p> Assistencias: {stats.duo_fpp.assists}</p>
                    <p> Dano causado: {stats.duo_fpp.damageDealt.toFixed(0)}</p>
                    <p> Tiros na cabeça: {stats.duo_fpp.headshotKills}</p>
                    <p> Morte mais longa: {stats.duo_fpp.longestKill.toFixed(0)}m</p> 
                    <p> N° mortes em uma partida: {stats.duo_fpp.roundMostKills}</p>
                    <p> Maior sequencia de mortes: {stats.duo_fpp.maxKillStreaks}</p>
                    <p> Mortes causadas por veiculos: {stats.duo_fpp.roadKills}</p>
                    <p> N° armas adqueridas: {stats.duo_fpp.weaponsAcquired}</p>
                    <p> N° mortes ultimo dia jogado: {stats.duo_fpp.dailyKills}</p>
                    <p> N° mortes ultima semana jogada: {stats.duo_fpp.weeklyKills}</p>
                  </div>

                  <div className={style.stats_survival}>
                    <h4>Sobrevivencia jogador</h4>
                    <p> Dias: {stats.duo_fpp.days}</p>
                    <p> Partidas disputadas: {stats.duo_fpp.roundsPlayed}</p>
                    <p> Partidas perdidas: {stats.duo_fpp.losses}</p>
                    <p> Vitórias: {stats.duo_fpp.wins}</p>
                    <p> Tempo de sobrevivencia: {handleDias(stats.duo_fpp.timeSurvived)}</p>
                    <p> Maior tempo de sobrevivencia durante uma partida: {handleMinutos(stats.duo_fpp.longestTimeSurvived)}</p>
                    <p> Vitórias do ultimo dia jogado: {stats.duo_fpp.dailyWins}</p>
                    <p> Vitórias durante a ultima semana jogada: {stats.duo_fpp.weeklyWins}</p>
                    <p> Top 10: {stats.duo_fpp.top10s}</p>
                  </div>

                  <div className={style.stats_healer}>
                    <h4>Curandeiro</h4>
                    <p> Itens de cura utilizados: {stats.duo_fpp.heals}</p>
                    <p> Itens de reforço utilizados (Famoso birico): {stats.duo_fpp.boosts}</p>
                    <p> Reviveu companheiros: {stats.duo_fpp.revives}</p>
                  </div>

                  <div className={style.stats_distances}>
                    <h4>Distancias</h4>
                    <p> Distancia percorrida a pé: {handleMetros(stats.duo_fpp.walkDistance)}</p>
                    <p> Distancia percorrida de carro: {handleMetros(stats.duo_fpp.rideDistance)}</p>
                    <p> Distancia percorrida enquanto nadava: {handleMetros(stats.duo_fpp.swimDistance)}</p>
                    <p> Veiculos destruidos: {stats.duo_fpp.vehicleDestroys}</p>
                  </div>

                  <div className={style.stats_friends}>
                    <h4>Conteudo para os amigos</h4>
                    <p> Suicidios: {stats.duo_fpp.suicides}</p>
                    <p> Vezes que matou um colega de equipe: {stats.duo_fpp.teamKills}</p>
                  </div>
                </>
              )
              ||
              (
                modo === "duo" &&
                <>
                  <div className={style.stats_offensive}>
                    <h4>Estátisticas ofensivas</h4>
                    <p> Nocautes: {stats.duo.dBNOs}</p>
                    <p> Mortes: {stats.duo.kills}</p>
                    <p> Assistencias: {stats.duo.assists}</p>
                    <p> Dano causado: {stats.duo.damageDealt.toFixed(0)}</p>
                    <p> Tiros na cabeça: {stats.duo.headshotKills}</p>
                    <p> Morte mais longa: {stats.duo.longestKill.toFixed(0)}m</p> 
                    <p> N° mortes em uma partida: {stats.duo.roundMostKills}</p>
                    <p> Maior sequencia de mortes: {stats.duo.maxKillStreaks}</p>
                    <p> Mortes causadas por veiculos: {stats.duo.roadKills}</p>
                    <p> N° armas adqueridas: {stats.duo.weaponsAcquired}</p>
                    <p> N° mortes ultimo dia jogado: {stats.duo.dailyKills}</p>
                    <p> N° mortes ultima semana jogada: {stats.duo.weeklyKills}</p>
                  </div>

                  <div className={style.stats_survival}>
                    <h4>Sobrevivencia jogador</h4>
                    <p> Dias: {stats.duo.days}</p>
                    <p> Partidas disputadas: {stats.duo.roundsPlayed}</p>
                    <p> Partidas perdidas: {stats.duo.losses}</p>
                    <p> Vitórias: {stats.duo.wins}</p>
                    <p> Tempo de sobrevivencia: {handleDias(stats.duo.timeSurvived)}</p>
                    <p> Maior tempo de sobrevivencia durante uma partida: {handleMinutos(stats.duo.longestTimeSurvived)}</p>
                    <p> Vitórias do ultimo dia jogado: {stats.duo.dailyWins}</p>
                    <p> Vitórias durante a ultima semana jogada: {stats.duo.weeklyWins}</p>
                    <p> Top 10: {stats.duo.top10s}</p>
                  </div>

                  <div className={style.stats_healer}>
                    <h4>Curandeiro</h4>
                    <p> Itens de cura utilizados: {stats.duo.heals}</p>
                    <p> Itens de reforço utilizados (Famoso birico): {stats.duo.boosts}</p>
                    <p> Reviveu companheiros: {stats.duo.revives}</p>
                  </div>

                  <div className={style.stats_distances}>
                    <h4>Distancias</h4>
                    <p> Distancia percorrida a pé: {handleMetros(stats.duo.walkDistance)}</p>
                    <p> Distancia percorrida de carro: {handleMetros(stats.duo.rideDistance)}</p>
                    <p> Distancia percorrida enquanto nadava: {handleMetros(stats.duo.swimDistance)}</p>
                    <p> Veiculos destruidos: {stats.duo.vehicleDestroys}</p>
                  </div>

                  <div className={style.stats_friends}>
                    <h4>Conteudo para os amigos</h4>
                    <p> Suicidios: {stats.duo.suicides}</p>
                    <p> Vezes que matou um colega de equipe: {stats.duo.teamKills}</p>
                  </div>
                </>
              )
              ||
              (
                modo === "squad_fpp" &&
                <div className=" content_stats">
                  <div className={`${style.stats_offensive} offensive`}>
                    <h4>Estátisticas ofensivas</h4>
                    <p> Nocautes: {stats.squad_fpp.dBNOs}</p>
                    <p> Mortes: {stats.squad_fpp.kills}</p>
                    <p> Assistencias: {stats.squad_fpp.assists}</p>
                    <p> Dano causado: {stats.squad_fpp.damageDealt.toFixed(0)}</p>
                    <p> Tiros na cabeça: {stats.squad_fpp.headshotKills}</p>
                    <p> Morte mais longa: {stats.squad_fpp.longestKill.toFixed(0)}m</p> 
                    <p> N° mortes em uma partida: {stats.squad_fpp.roundMostKills}</p>
                    <p> Maior sequencia de mortes: {stats.squad_fpp.maxKillStreaks}</p>
                    <p> Mortes causadas por veiculos: {stats.squad_fpp.roadKills}</p>
                    <p> N° armas adqueridas: {stats.squad_fpp.weaponsAcquired}</p>
                    <p> N° mortes ultimo dia jogado: {stats.squad_fpp.dailyKills}</p>
                    <p> N° mortes ultima semana jogada: {stats.squad_fpp.weeklyKills}</p>
                  </div>

                  <div className={`${style.stats_survival} survival`}>
                    <h4>Sobrevivencia jogador</h4>
                    <p> Dias: {stats.squad_fpp.days}</p>
                    <p> Partidas disputadas: {stats.squad_fpp.roundsPlayed}</p>
                    <p> Partidas perdidas: {stats.squad_fpp.losses}</p>
                    <p> Vitórias: {stats.squad_fpp.wins}</p>
                    <p> Tempo de sobrevivencia: {handleDias(stats.squad_fpp.timeSurvived)}</p>
                    <p> Maior tempo de sobrevivencia durante uma partida: {handleMinutos(stats.squad_fpp.longestTimeSurvived)}</p>
                    <p> Vitórias do ultimo dia jogado: {stats.squad_fpp.dailyWins}</p>
                    <p> Vitórias durante a ultima semana jogada: {stats.squad_fpp.weeklyWins}</p>
                    <p> Top 10: {stats.squad_fpp.top10s}</p>
                  </div>

                  <div className={`${style.stats_healer} healer`}>
                    <h4>Curandeiro</h4>
                    <p> Itens de cura utilizados: {stats.squad_fpp.heals}</p>
                    <p> Itens de reforço utilizados (Famoso birico): {stats.squad_fpp.boosts}</p>
                    <p> Reviveu companheiros: {stats.squad_fpp.revives}</p>
                  </div>

                  <div className={`${style.stats_distances} distances`}>
                    <h4>Distancias</h4>
                    <p> Distancia percorrida a pé: {handleMetros(stats.squad_fpp.walkDistance)}</p>
                    <p> Distancia percorrida de carro: {handleMetros(stats.squad_fpp.rideDistance)}</p>
                    <p> Distancia percorrida enquanto nadava: {handleMetros(stats.squad_fpp.swimDistance)}</p>
                    <p> Veiculos destruidos: {stats.squad_fpp.vehicleDestroys}</p>
                  </div>

                  <div className={`${style.stats_friends} friends`}>
                    <h4>Conteudo para os amigos</h4>
                    <p> Suicidios: {stats.squad_fpp.suicides}</p>
                    <p> Vezes que matou um colega de equipe: {stats.squad_fpp.teamKills}</p>
                  </div>
                </div>
              )
              ||
              (
                modo === "squad" &&
                <>
                  <div className={style.stats_offensive}>
                    <h4>Estátisticas ofensivas</h4>
                    <p> Nocautes: {stats.squad.dBNOs}</p>
                    <p> Mortes: {stats.squad.kills}</p>
                    <p> Assistencias: {stats.squad.assists}</p>
                    <p> Dano causado: {stats.squad.damageDealt.toFixed(0)}</p>
                    <p> Tiros na cabeça: {stats.squad.headshotKills}</p>
                    <p> Morte mais longa: {stats.squad.longestKill.toFixed(0)}m</p> 
                    <p> N° mortes em uma partida: {stats.squad.roundMostKills}</p>
                    <p> Maior sequencia de mortes: {stats.squad.maxKillStreaks}</p>
                    <p> Mortes causadas por veiculos: {stats.squad.roadKills}</p>
                    <p> N° armas adqueridas: {stats.squad.weaponsAcquired}</p>
                    <p> N° mortes ultimo dia jogado: {stats.squad.dailyKills}</p>
                    <p> N° mortes ultima semana jogada: {stats.squad.weeklyKills}</p>
                  </div>

                  <div className={style.stats_survival}>
                    <h4>Sobrevivencia jogador</h4>
                    <p> Dias: {stats.squad.days}</p>
                    <p> Partidas disputadas: {stats.squad.roundsPlayed}</p>
                    <p> Partidas perdidas: {stats.squad.losses}</p>
                    <p> Vitórias: {stats.squad.wins}</p>
                    <p> Tempo de sobrevivencia: {handleDias(stats.squad.timeSurvived)}</p>
                    <p> Maior tempo de sobrevivencia durante uma partida: {handleMinutos(stats.squad.longestTimeSurvived)}</p>
                    <p> Vitórias do ultimo dia jogado: {stats.squad.dailyWins}</p>
                    <p> Vitórias durante a ultima semana jogada: {stats.squad.weeklyWins}</p>
                    <p> Top 10: {stats.squad.top10s}</p>
                  </div>

                  <div className={style.stats_healer}>
                    <h4>Curandeiro</h4>
                    <p> Itens de cura utilizados: {stats.squad.heals}</p>
                    <p> Itens de reforço utilizados (Famoso birico): {stats.squad.boosts}</p>
                    <p> Reviveu companheiros: {stats.squad.revives}</p>
                  </div>

                  <div className={style.stats_distances}>
                    <h4>Distancias</h4>
                    <p> Distancia percorrida a pé: {handleMetros(stats.squad.walkDistance)}</p>
                    <p> Distancia percorrida de carro: {handleMetros(stats.squad.rideDistance)}</p>
                    <p> Distancia percorrida enquanto nadava: {handleMetros(stats.squad.swimDistance)}</p>
                    <p> Veiculos destruidos: {stats.squad.vehicleDestroys}</p>
                  </div>

                  <div className={style.stats_friends}>
                    <h4>Conteudo para os amigos</h4>
                    <p> Suicidios: {stats.squad.suicides}</p>
                    <p> Vezes que matou um colega de equipe: {stats.squad.teamKills}</p>
                  </div>
                  
                </>
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