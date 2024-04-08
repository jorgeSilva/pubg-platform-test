'use client'

import { fetchApiPubgUser, fetchApiPubgStats } from "@/actions/fetch-api-pubg-stats"
import React, { use } from "react"

type IURL = {
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
    demageDealt: number,
    days: number,
    headshotKills: number,
    heals: number,
    killPoints: number,
    kills: number,
    longestKill: number,
    longesTimeSurvived: number,
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
    swinDistance: number,
    teamKills: number,
    timeSurvived: number,
    top10s: number,
    vehicleDestroyes: number,
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
    demageDealt: number,
    days: number,
    headshotKills: number,
    heals: number,
    killPoints: number,
    kills: number,
    longestKill: number,
    longesTimeSurvived: number,
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
    swinDistance: number,
    teamKills: number,
    timeSurvived: number,
    top10s: number,
    vehicleDestroyes: number,
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
    demageDealt: number,
    days: number,
    headshotKills: number,
    heals: number,
    killPoints: number,
    kills: number,
    longestKill: number,
    longesTimeSurvived: number,
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
    swinDistance: number,
    teamKills: number,
    timeSurvived: number,
    top10s: number,
    vehicleDestroyes: number,
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
    demageDealt: number,
    days: number,
    headshotKills: number,
    heals: number,
    killPoints: number,
    kills: number,
    longestKill: number,
    longesTimeSurvived: number,
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
    swinDistance: number,
    teamKills: number,
    timeSurvived: number,
    top10s: number,
    vehicleDestroyes: number,
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
    demageDealt: number,
    days: number,
    headshotKills: number,
    heals: number,
    killPoints: number,
    kills: number,
    longestKill: number,
    longesTimeSurvived: number,
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
    swinDistance: number,
    teamKills: number,
    timeSurvived: number,
    top10s: number,
    vehicleDestroyes: number,
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
    demageDealt: number,
    days: number,
    headshotKills: number,
    heals: number,
    killPoints: number,
    kills: number,
    longestKill: number,
    longesTimeSurvived: number,
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
    swinDistance: number,
    teamKills: number,
    timeSurvived: number,
    top10s: number,
    vehicleDestroyes: number,
    walkDistance: number,
    weaponsAcquired: number,
    weeklyKills: number,
    weeklyWins: number,
    winPoints: number,
    wins: number,
  }
}

export default function PerfilID({params}: IURL){
  const [user, setuser] = React.useState<IUser | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [stats, setStats] = React.useState<IStatsFormt | null>(null)
  
  async function handleClick(){
    if(user){
      try{
        const response: IStats = await fetchApiPubgStats(user?.data[0].id)
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
        setError('Erro ao encontrar usuario')
      }
    }else{
      setError('Erro ao pegar o krl do usuario')
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
      <h3>{params.id}</h3>
      <button onClick={handleClick}>Ver estatisticas</button>
      {
        stats && error === null ?
        <>
          <p> Assistencia: {stats.squad_fpp.assists}</p>
          <p> Kills: {stats.squad_fpp.kills}</p>
          <p> Maximo de kills: {stats.squad_fpp.dailyKills}</p>
          <p> DBNOS: {stats.squad_fpp.dBNOs}</p>
        </>
        :
        <p>{error}</p>
      }
    </>
  )
}