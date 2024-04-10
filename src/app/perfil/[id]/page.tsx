'use client'

import { fetchApiPubgUser, fetchApiPubgStats, fetchApiPubgMastery } from "@/actions/fetch-api-pubg-stats"
import React from "react"

export type IURL = {
  params: {
    id: string
  }
}

type IUser = {
  data: [{
    attributes: {
      banType: string,
      clanId: string,
      name: string,
      patchVersion: string,
      shardId: string,
      stats: null | string,
      titleId: "pubg"
    },
    id: string,
    links: {},
    relationships: {}
    type: string
  }],
  links: {},
  meta: {}
  ok: boolean
}

type IStats = {
  data: {
    attributes: {
      bestRankPoint: number,
      gameModeStats: {}
    },
    relationships: {
    }
    type: string
  },
  links: {},
  meta: {}
  ok: boolean
}

type IStatsFormt = {
  duo: {
    assists: number,
    boosts: number,
    dBNOs: number,
    dailyKills: number,
    dailyWins: number,
    damageDealt: number,
    days: number,
    headshotKills: number,
    heals: number,
    killPoints: number,
    kills: number,
    longestKill: number,
    longestTimeSurvived: number,
    losses: number,
    maxKillStreaks: number,
    mostSurvivalTime: number,
    rankPoints: number,
    rankPointsTitle: string | number,
    revives: number,
    rideDistance: number,
    roadKills: number,
    roundMostKills: number,
    roundsPlayed: number,
    suicides: number,
    swimDistance: number,
    teamKills: number,
    timeSurvived: number,
    top10s: number,
    vehicleDestroys: number,
    walkDistance: number,
    weaponsAcquired: number,
    weeklyKills: number,
    weeklyWins: number,
    winPoints: number,
    wins: number,
  },
  duo_fpp: {
    assists: number,
    boosts: number,
    dBNOs: number,
    dailyKills: number,
    dailyWins: number,
    damageDealt: number,
    days: number,
    headshotKills: number,
    heals: number,
    killPoints: number,
    kills: number,
    longestKill: number,
    longestTimeSurvived: number,
    losses: number,
    maxKillStreaks: number,
    mostSurvivalTime: number,
    rankPoints: number,
    rankPointsTitle: string | number,
    revives: number,
    rideDistance: number,
    roadKills: number,
    roundMostKills: number,
    roundsPlayed: number,
    suicides: number,
    swimDistance: number,
    teamKills: number,
    timeSurvived: number,
    top10s: number,
    vehicleDestroys: number,
    walkDistance: number,
    weaponsAcquired: number,
    weeklyKills: number,
    weeklyWins: number,
    winPoints: number,
    wins: number,
  },
  solo: {
    assists: number,
    boosts: number,
    dBNOs: number,
    dailyKills: number,
    dailyWins: number,
    damageDealt: number,
    days: number,
    headshotKills: number,
    heals: number,
    killPoints: number,
    kills: number,
    longestKill: number,
    longestTimeSurvived: number,
    losses: number,
    maxKillStreaks: number,
    mostSurvivalTime: number,
    rankPoints: number,
    rankPointsTitle: string | number,
    revives: number,
    rideDistance: number,
    roadKills: number,
    roundMostKills: number,
    roundsPlayed: number,
    suicides: number,
    swimDistance: number,
    teamKills: number,
    timeSurvived: number,
    top10s: number,
    vehicleDestroys: number,
    walkDistance: number,
    weaponsAcquired: number,
    weeklyKills: number,
    weeklyWins: number,
    winPoints: number,
    wins: number,
  },
  solo_fpp: {
    assists: number,
    boosts: number,
    dBNOs: number,
    dailyKills: number,
    dailyWins: number,
    damageDealt: number,
    days: number,
    headshotKills: number,
    heals: number,
    killPoints: number,
    kills: number,
    longestKill: number,
    longestTimeSurvived: number,
    losses: number,
    maxKillStreaks: number,
    mostSurvivalTime: number,
    rankPoints: number,
    rankPointsTitle: string | number,
    revives: number,
    rideDistance: number,
    roadKills: number,
    roundMostKills: number,
    roundsPlayed: number,
    suicides: number,
    swimDistance: number,
    teamKills: number,
    timeSurvived: number,
    top10s: number,
    vehicleDestroys: number,
    walkDistance: number,
    weaponsAcquired: number,
    weeklyKills: number,
    weeklyWins: number,
    winPoints: number,
    wins: number,
  },
  squad: {
    assists: number,
    boosts: number,
    dBNOs: number,
    dailyKills: number,
    dailyWins: number,
    damageDealt: number,
    days: number,
    headshotKills: number,
    heals: number,
    killPoints: number,
    kills: number,
    longestKill: number,
    longestTimeSurvived: number,
    losses: number,
    maxKillStreaks: number,
    mostSurvivalTime: number,
    rankPoints: number,
    rankPointsTitle: string | number,
    revives: number,
    rideDistance: number,
    roadKills: number,
    roundMostKills: number,
    roundsPlayed: number,
    suicides: number,
    swimDistance: number,
    teamKills: number,
    timeSurvived: number,
    top10s: number,
    vehicleDestroys: number,
    walkDistance: number,
    weaponsAcquired: number,
    weeklyKills: number,
    weeklyWins: number,
    winPoints: number,
    wins: number,
  },
  squad_fpp: {
    assists: number,
    boosts: number,
    dBNOs: number,
    dailyKills: number,
    dailyWins: number,
    damageDealt: number,
    days: number,
    headshotKills: number,
    heals: number,
    killPoints: number,
    kills: number,
    longestKill: number,
    longestTimeSurvived: number,
    losses: number,
    maxKillStreaks: number,
    mostSurvivalTime: number,
    rankPoints: number,
    rankPointsTitle: string | number,
    revives: number,
    rideDistance: number,
    roadKills: number,
    roundMostKills: number,
    roundsPlayed: number,
    suicides: number,
    swimDistance: number,
    teamKills: number,
    timeSurvived: number,
    top10s: number,
    vehicleDestroys: number,
    walkDistance: number,
    weaponsAcquired: number,
    weeklyKills: number,
    weeklyWins: number,
    winPoints: number,
    wins: number,
  }
}

type IWeapons =  {
  name: string,
  weapon: {
    CompetitiveStatsTotal: {
      DamagePlayer:number,
      Defeats:number,
      Groggies:number,
      HeadShots:number,
      Kills:number,
      LongestKill:number,
      MostDefeatsInAGame:number,
      MostKillsInAGame: number
    },
    LevelCurrent: number,
    Medals: [],
    OfficialStatsTotal: {
      DamagePlayer:number,
      Defeats:number,
      Groggies:number,
      HeadShots:number,
      Kills:number,
      LongestKill:number,
      MostDefeatsInAGame:number,
      MostKillsInAGame: number
    },
    StatsTotal: {
      DamagePlayer:number,
      Defeats:number,
      Groggies:number,
      HeadShots:number,
      Kills:number,
      LongestKill:number,
      MostDefeatsInAGame:number,
      MostKillsInAGame: number
    }
    TierCurrent: number,
    XPTotal: number
  }
}

export default function PerfilID({params}: IURL){
  const [user, setuser] = React.useState<IUser | null>(null)
  const [error, setError] = React.useState<{msg: string, fetch: string} | null>(null)
  const [stats, setStats] = React.useState<IStatsFormt | null>(null)
  const [mastery, setMastery] = React.useState<IWeapons[] | null>(null)
  const [modo, setModo] = React.useState('')
  const [modoWeapon, setModoWeapon] = React.useState('')
  
  async function handleClick(){
    if(user){
      try{
        const response: IStats = await fetchApiPubgStats(user.data[0].id, user.data[0].attributes.shardId)
        if(response){
          const valueResponse: any = Object.values(response.data.attributes.gameModeStats)

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
        setError({msg: 'Erro ao encontrar usuario', fetch: 'handleClick'})
      }
    }else{
      setError({msg: 'Erro ao encontrar usuario', fetch: 'handleClick'})
    }
  }

  async function handleWeapons(){
    if(user){
       try{
        const response: any = await fetchApiPubgMastery(user.data[0].id)
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
    }else{
      return setError({msg: 'Erro ao encontrar usuario', fetch: 'handleWeapons'})
    }
  }

  async function handledata(){
    const response = await fetchApiPubgUser(params.id)
    setuser(response)
  }

  React.useEffect(() => {
    handledata()
  }, [])

  return (
    <>
      <h2>{params.id}</h2>
      <article style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr", gap:"2rem"}}>
        <section style={{gridColumn:"1"}}>
          <h1>Estatisticas</h1>
          <button onClick={handleClick}>Ver estatisticas</button>
          <div>
            {
              stats && error === null ?
              <>
                Modo de jogo: <select name="modo" id="modo" onChange={({target}) => {
                  setModo(target.value)
                }}>
                  <option id="modo" value={''}></option>
                  <option id="modo" value={'solo'}>Solo TPP</option>
                  <option id="modo" value={'solo_fpp'}>Solo FPP</option>
                  <option id="modo" value={'duo'}>Duo TPP</option>
                  <option id="modo" value={'duo_fpp'}>Duo FPP</option>
                  <option id="modo" value={'squad'}>Squad TPP</option>
                  <option id="modo" value={'squad_fpp'}>Squad FPP</option>
                </select>

                <div>
                  {
                    (
                      modo === "solo_fpp" &&
                      <>
                        <p> Assistencias: {stats.solo_fpp.assists}</p>
                        <p> Mortes: {stats.solo_fpp.kills}</p>
                        <p> Tiros na cabeça: {stats.solo_fpp.headshotKills}</p>
                        <p> Nocautes: {stats.solo_fpp.dBNOs}</p>
                        <p> Itens de reforço utilizados (Famoso birico): {stats.solo_fpp.boosts}</p>
                        <p> Mortes durante o ultimo dia jogado: {stats.solo_fpp.dailyKills}</p>
                        <p> Dano causado: {stats.solo_fpp.damageDealt}</p>
                        <p> Dias: {stats.solo_fpp.days}</p>
                        <p> Vitórias do ultimo dia jogado: {stats.solo_fpp.dailyWins}</p>
                        <p> Itens de cura utilizados: {stats.solo_fpp.heals}</p>
                        <p> Morte mais longa: {stats.solo_fpp.longestKill}</p>
                        <p> Maior tempo de sobrevivencia durante uma partida: {stats.solo_fpp.longestTimeSurvived}</p>
                        <p> Partidas perdidas: {stats.solo_fpp.losses}</p>
                        <p> Maior sequencia de mortes: {stats.solo_fpp.maxKillStreaks}</p>
                        <p> Reviviu companheiros: {stats.solo_fpp.revives}</p>
                        <p> Distancia percorrida de carro: {stats.solo_fpp.rideDistance}</p>
                        <p> Mortes causadas por veiculos: {stats.solo_fpp.roadKills}</p>
                        <p> Maior numero de mortes em uma unica partida: {stats.solo_fpp.roundMostKills}</p>
                        <p> Partidas disputadas: {stats.solo_fpp.roundsPlayed}</p>
                        <p> Suicidios: {stats.solo_fpp.suicides}</p>
                        <p> Distancia percorrida enquanto nadava: {stats.solo_fpp.swimDistance}m</p>
                        <p> Vezes que matou um colega de equipe: {stats.solo_fpp.teamKills}</p>
                        <p> Tempo de sobrevivencia: {stats.solo_fpp.timeSurvived}</p>
                        <p> Top 10: {stats.solo_fpp.top10s}</p>
                        <p> Veiculos destruidos: {stats.solo_fpp.vehicleDestroys}</p>
                        <p> Distancia percorrida a pé: {stats.solo_fpp.walkDistance}</p>
                        <p> Armas adqueridas: {stats.solo_fpp.weaponsAcquired}</p>
                        <p> Mortes durante a ultima semana jogada: {stats.solo_fpp.weeklyKills}</p>
                        <p> Vitórias durante a ultima semana jogada: {stats.solo_fpp.weeklyWins}</p>
                        <p> Vitórias: {stats.solo_fpp.wins}</p>
                      </>
                    )
                    ||
                    (
                      modo === "solo" &&
                      <>
                        <p> Assistencias: {stats.solo.assists}</p>
                        <p> Mortes: {stats.solo.kills}</p>
                        <p> Tiros na cabeça: {stats.solo.headshotKills}</p>
                        <p> Nocautes: {stats.solo.dBNOs}</p>
                        <p> Itens de reforço utilizados (Famoso birico): {stats.solo.boosts}</p>
                        <p> Mortes durante o ultimo dia jogado: {stats.solo.dailyKills}</p>
                        <p> Dano causado: {stats.solo.damageDealt}</p>
                        <p> Dias: {stats.solo.days}</p>
                        <p> Vitórias do ultimo dia jogado: {stats.solo.dailyWins}</p>
                        <p> Itens de cura utilizados: {stats.solo.heals}</p>
                        <p> Morte mais longa: {stats.solo.longestKill}</p>
                        <p> Maior tempo de sobrevivencia durante uma partida: {stats.solo.longestTimeSurvived}</p>
                        <p> Partidas perdidas: {stats.solo.losses}</p>
                        <p> Maior sequencia de mortes: {stats.solo.maxKillStreaks}</p>
                        <p> Reviviu companheiros: {stats.solo.revives}</p>
                        <p> Distancia percorrida de carro: {stats.solo.rideDistance}</p>
                        <p> Mortes causadas por veiculos: {stats.solo.roadKills}</p>
                        <p> Maior numero de mortes em uma unica partida: {stats.solo.roundMostKills}</p>
                        <p> Partidas disputadas: {stats.solo.roundsPlayed}</p>
                        <p> Suicidios: {stats.solo.suicides}</p>
                        <p> Distancia percorrida enquanto nadava: {stats.solo.swimDistance}m</p>
                        <p> Vezes que matou um colega de equipe: {stats.solo.teamKills}</p>
                        <p> Tempo de sobrevivencia: {stats.solo.timeSurvived}</p>
                        <p> Top 10: {stats.solo.top10s}</p>
                        <p> Veiculos destruidos: {stats.solo.vehicleDestroys}</p>
                        <p> Distancia percorrida a pé: {stats.solo.walkDistance}</p>
                        <p> Armas adqueridas: {stats.solo.weaponsAcquired}</p>
                        <p> Mortes durante a ultima semana jogada: {stats.solo.weeklyKills}</p>
                        <p> Vitórias durante a ultima semana jogada: {stats.solo.weeklyWins}</p>
                        <p> Vitórias: {stats.solo.wins}</p>
                      </>
                    )
                    ||
                    (
                      modo === "duo_fpp" &&
                      <>
                        <p> Assistencias: {stats.duo_fpp.assists}</p>
                        <p> Mortes: {stats.duo_fpp.kills}</p>
                        <p> Tiros na cabeça: {stats.duo_fpp.headshotKills}</p>
                        <p> Nocautes: {stats.duo_fpp.dBNOs}</p>
                        <p> Itens de reforço utilizados (Famoso birico): {stats.duo_fpp.boosts}</p>
                        <p> Mortes durante o ultimo dia jogado: {stats.duo_fpp.dailyKills}</p>
                        <p> Dano causado: {stats.duo_fpp.damageDealt}</p>
                        <p> Dias: {stats.duo_fpp.days}</p>
                        <p> Vitórias do ultimo dia jogado: {stats.duo_fpp.dailyWins}</p>
                        <p> Itens de cura utilizados: {stats.duo_fpp.heals}</p>
                        <p> Morte mais longa: {stats.duo_fpp.longestKill}</p>
                        <p> Maior tempo de sobrevivencia durante uma partida: {stats.duo_fpp.longestTimeSurvived}</p>
                        <p> Partidas perdidas: {stats.duo_fpp.losses}</p>
                        <p> Maior sequencia de mortes: {stats.duo_fpp.maxKillStreaks}</p>
                        <p> Reviviu companheiros: {stats.duo_fpp.revives}</p>
                        <p> Distancia percorrida de carro: {stats.duo_fpp.rideDistance}</p>
                        <p> Mortes causadas por veiculos: {stats.duo_fpp.roadKills}</p>
                        <p> Maior numero de mortes em uma unica partida: {stats.duo_fpp.roundMostKills}</p>
                        <p> Partidas disputadas: {stats.duo_fpp.roundsPlayed}</p>
                        <p> Suicidios: {stats.duo_fpp.suicides}</p>
                        <p> Distancia percorrida enquanto nadava: {stats.duo_fpp.swimDistance}m</p>
                        <p> Vezes que matou um colega de equipe: {stats.duo_fpp.teamKills}</p>
                        <p> Tempo de sobrevivencia: {stats.duo_fpp.timeSurvived}</p>
                        <p> Top 10: {stats.duo_fpp.top10s}</p>
                        <p> Veiculos destruidos: {stats.duo_fpp.vehicleDestroys}</p>
                        <p> Distancia percorrida a pé: {stats.duo_fpp.walkDistance}</p>
                        <p> Armas adqueridas: {stats.duo_fpp.weaponsAcquired}</p>
                        <p> Mortes durante a ultima semana jogada: {stats.duo_fpp.weeklyKills}</p>
                        <p> Vitórias durante a ultima semana jogada: {stats.duo_fpp.weeklyWins}</p>
                        <p> Vitórias: {stats.duo_fpp.wins}</p>
                      </>
                    )
                    ||
                    (
                      modo === "duo" &&
                      <>
                        <p> Assistencias: {stats.duo.assists}</p>
                        <p> Mortes: {stats.duo.kills}</p>
                        <p> Tiros na cabeça: {stats.duo.headshotKills}</p>
                        <p> Nocautes: {stats.duo.dBNOs}</p>
                        <p> Itens de reforço utilizados (Famoso birico): {stats.duo.boosts}</p>
                        <p> Mortes durante o ultimo dia jogado: {stats.duo.dailyKills}</p>
                        <p> Dano causado: {stats.duo.damageDealt}</p>
                        <p> Dias: {stats.duo.days}</p>
                        <p> Vitórias do ultimo dia jogado: {stats.duo.dailyWins}</p>
                        <p> Itens de cura utilizados: {stats.duo.heals}</p>
                        <p> Morte mais longa: {stats.duo.longestKill}</p>
                        <p> Maior tempo de sobrevivencia durante uma partida: {stats.duo.longestTimeSurvived}</p>
                        <p> Partidas perdidas: {stats.duo.losses}</p>
                        <p> Maior sequencia de mortes: {stats.duo.maxKillStreaks}</p>
                        <p> Reviviu companheiros: {stats.duo.revives}</p>
                        <p> Distancia percorrida de carro: {stats.duo.rideDistance}</p>
                        <p> Mortes causadas por veiculos: {stats.duo.roadKills}</p>
                        <p> Maior numero de mortes em uma unica partida: {stats.duo.roundMostKills}</p>
                        <p> Partidas disputadas: {stats.duo.roundsPlayed}</p>
                        <p> Suicidios: {stats.duo.suicides}</p>
                        <p> Distancia percorrida enquanto nadava: {stats.duo.swimDistance}m</p>
                        <p> Vezes que matou um colega de equipe: {stats.duo.teamKills}</p>
                        <p> Tempo de sobrevivencia: {stats.duo.timeSurvived}</p>
                        <p> Top 10: {stats.duo.top10s}</p>
                        <p> Veiculos destruidos: {stats.duo.vehicleDestroys}</p>
                        <p> Distancia percorrida a pé: {stats.duo.walkDistance}</p>
                        <p> Armas adqueridas: {stats.duo.weaponsAcquired}</p>
                        <p> Mortes durante a ultima semana jogada: {stats.duo.weeklyKills}</p>
                        <p> Vitórias durante a ultima semana jogada: {stats.duo.weeklyWins}</p>
                        <p> Vitórias: {stats.duo.wins}</p>
                      </>
                    )
                    ||
                    (
                      modo === "squad_fpp" &&
                      <>
                        <p> Assistencias: {stats.squad_fpp.assists}</p>
                        <p> Mortes: {stats.squad_fpp.kills}</p>
                        <p> Tiros na cabeça: {stats.squad_fpp.headshotKills}</p>
                        <p> Nocautes: {stats.squad_fpp.dBNOs}</p>
                        <p> Itens de reforço utilizados (Famoso birico): {stats.squad_fpp.boosts}</p>
                        <p> Mortes durante o ultimo dia jogado: {stats.squad_fpp.dailyKills}</p>
                        <p> Dano causado: {stats.squad_fpp.damageDealt}</p>
                        <p> Dias: {stats.squad_fpp.days}</p>
                        <p> Vitórias do ultimo dia jogado: {stats.squad_fpp.dailyWins}</p>
                        <p> Itens de cura utilizados: {stats.squad_fpp.heals}</p>
                        <p> Morte mais longa: {stats.squad_fpp.longestKill}</p>
                        <p> Maior tempo de sobrevivencia durante uma partida: {stats.squad_fpp.longestTimeSurvived}</p>
                        <p> Partidas perdidas: {stats.squad_fpp.losses}</p>
                        <p> Maior sequencia de mortes: {stats.squad_fpp.maxKillStreaks}</p>
                        <p> Reviviu companheiros: {stats.squad_fpp.revives}</p>
                        <p> Distancia percorrida de carro: {stats.squad_fpp.rideDistance}</p>
                        <p> Mortes causadas por veiculos: {stats.squad_fpp.roadKills}</p>
                        <p> Maior numero de mortes em uma unica partida: {stats.squad_fpp.roundMostKills}</p>
                        <p> Partidas disputadas: {stats.squad_fpp.roundsPlayed}</p>
                        <p> Suicidios: {stats.squad_fpp.suicides}</p>
                        <p> Distancia percorrida enquanto nadava: {stats.squad_fpp.swimDistance}m</p>
                        <p> Vezes que matou um colega de equipe: {stats.squad_fpp.teamKills}</p>
                        <p> Tempo de sobrevivencia: {stats.squad_fpp.timeSurvived}</p>
                        <p> Top 10: {stats.squad_fpp.top10s}</p>
                        <p> Veiculos destruidos: {stats.squad_fpp.vehicleDestroys}</p>
                        <p> Distancia percorrida a pé: {stats.squad_fpp.walkDistance}</p>
                        <p> Armas adqueridas: {stats.squad_fpp.weaponsAcquired}</p>
                        <p> Mortes durante a ultima semana jogada: {stats.squad_fpp.weeklyKills}</p>
                        <p> Vitórias durante a ultima semana jogada: {stats.squad_fpp.weeklyWins}</p>
                        <p> Vitórias: {stats.squad_fpp.wins}</p>
                      </>
                    )
                    ||
                    (
                      modo === "squad" &&
                      <>
                        <p> Assistencias: {stats.squad.assists}</p>
                        <p> Mortes: {stats.squad.kills}</p>
                        <p> Tiros na cabeça: {stats.squad.headshotKills}</p>
                        <p> Nocautes: {stats.squad.dBNOs}</p>
                        <p> Itens de reforço utilizados (Famoso birico): {stats.squad.boosts}</p>
                        <p> Mortes durante o ultimo dia jogado: {stats.squad.dailyKills}</p>
                        <p> Dano causado: {stats.squad.damageDealt}</p>
                        <p> Dias: {stats.squad.days}</p>
                        <p> Vitórias do ultimo dia jogado: {stats.squad.dailyWins}</p>
                        <p> Itens de cura utilizados: {stats.squad.heals}</p>
                        <p> Morte mais longa: {stats.squad.longestKill}</p>
                        <p> Maior tempo de sobrevivencia durante uma partida: {stats.squad.longestTimeSurvived}</p>
                        <p> Partidas perdidas: {stats.squad.losses}</p>
                        <p> Maior sequencia de mortes: {stats.squad.maxKillStreaks}</p>
                        <p> Reviviu companheiros: {stats.squad.revives}</p>
                        <p> Distancia percorrida de carro: {stats.squad.rideDistance}</p>
                        <p> Mortes causadas por veiculos: {stats.squad.roadKills}</p>
                        <p> Maior numero de mortes em uma unica partida: {stats.squad.roundMostKills}</p>
                        <p> Partidas disputadas: {stats.squad.roundsPlayed}</p>
                        <p> Suicidios: {stats.squad.suicides}</p>
                        <p> Distancia percorrida enquanto nadava: {stats.squad.swimDistance}m</p>
                        <p> Vezes que matou um colega de equipe: {stats.squad.teamKills}</p>
                        <p> Tempo de sobrevivencia: {stats.squad.timeSurvived}</p>
                        <p> Top 10: {stats.squad.top10s}</p>
                        <p> Veiculos destruidos: {stats.squad.vehicleDestroys}</p>
                        <p> Distancia percorrida a pé: {stats.squad.walkDistance}</p>
                        <p> Armas adqueridas: {stats.squad.weaponsAcquired}</p>
                        <p> Mortes durante a ultima semana jogada: {stats.squad.weeklyKills}</p>
                        <p> Vitórias durante a ultima semana jogada: {stats.squad.weeklyWins}</p>
                        <p> Vitórias: {stats.squad.wins}</p>
                      </>
                    )
                  }
                </div>
              </>
              :
              <>
                {
                  error && error.fetch === 'handleClick' &&
                  <p>{error?.msg}</p>
                }
              </>
            }
          </div>
        </section>
        
        <section style={{gridColumn:"2 / -1"}}>
          <h1>Dominio das Armas</h1>
          <button onClick={handleWeapons}>Ver dominio das armas</button>
          <div>
            {
              mastery && error === null ?
                <>
                  Modo de jogo: <select name="modoWeapon" id="modoWeapon" onChange={({target}) => {
                    setModoWeapon(target.value)
                  }}>
                    <option id="modoWeapon" value={''}></option>
                    <option id="modoWeapon" value={'CompetitiveStatsTotal'}>Estatistica modo ranked</option>
                    <option id="modoWeapon" value={'OfficialStatsTotal'}>Estatistica modo normal</option>
                  </select>
                  <div style={{display:"flex", height:"auto",  flexWrap:"wrap"}}>
                    { 
                      (

                        modoWeapon === "CompetitiveStatsTotal" &&
                          mastery.map(value => (
                          <div key={value.name} style={{padding:"1rem"}}>
                            <h4>{value.name}</h4>
                            <p>Nível da arma: {value.weapon.TierCurrent}</p>
                            <p>XP: {value.weapon.XPTotal}</p>
                            <p>Mortes: {value.weapon.CompetitiveStatsTotal.Kills}</p>
                            <p>Dano causado: {value.weapon.CompetitiveStatsTotal.DamagePlayer}</p>
                            <p>Tiros na cabeça: {value.weapon.CompetitiveStatsTotal.HeadShots}</p>
                            <p>Maior numero de mortes em uma partida: {value.weapon.CompetitiveStatsTotal.MostKillsInAGame}</p>
                            <p>Morte mais longa: {value.weapon.CompetitiveStatsTotal.LongestKill}</p>
                            <p>Nocauteados: {value.weapon.CompetitiveStatsTotal.Groggies}</p>
                            <p>Mais derrotas em uma partida: {value.weapon.CompetitiveStatsTotal.MostDefeatsInAGame}</p>
                            <p>Derrotas da carreira: {value.weapon.CompetitiveStatsTotal.Defeats}</p>
                          </div>
                        ))
                      )
                      ||
                      (
                        modoWeapon === "OfficialStatsTotal" &&
                          mastery.map(value => (
                          <div key={value.name} style={{padding:"1rem"}}>
                            <h4>{value.name}</h4>
                            <p>Nível da arma: {value.weapon.TierCurrent}</p>
                            <p>XP: {value.weapon.XPTotal}</p>
                            <p>Mortes: {value.weapon.OfficialStatsTotal.Kills}</p>
                            <p>Dano causado: {value.weapon.OfficialStatsTotal.DamagePlayer}</p>
                            <p>Tiros na cabeça: {value.weapon.OfficialStatsTotal.HeadShots}</p>
                            <p>Maior numero de mortes em uma partida: {value.weapon.OfficialStatsTotal.MostKillsInAGame}</p>
                            <p>Morte mais longa: {value.weapon.OfficialStatsTotal.LongestKill}</p>
                            <p>Nocauteados: {value.weapon.OfficialStatsTotal.Groggies}</p>
                            <p>Mais derrotas em uma partida: {value.weapon.OfficialStatsTotal.MostDefeatsInAGame}</p>
                            <p>Derrotas da carreira: {value.weapon.OfficialStatsTotal.Defeats}</p>
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
      </article>
      
    </>
  )
}