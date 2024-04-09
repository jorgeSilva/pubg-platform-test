'use client'

import { fetchApiPubgUser, fetchApiPubgStats, fetchApiPubgMastery } from "@/actions/fetch-api-pubg-stats"
import React from "react"

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
  
  async function handleClick(){
    if(user){
      try{
        const response: IStats = await fetchApiPubgStats(user.data[0].id)
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
      <button onClick={handleClick}>Ver estatisticas</button>
      <div>
        {
          stats && error === null ?
          <>
            <p> Assistencia: {stats.squad_fpp.assists}</p>
            <p> Kills: {stats.squad_fpp.kills}</p>
            <p> Tiros na cabeça: {stats.squad_fpp.headshotKills}</p>
            <p> DBNOS: {stats.squad_fpp.dBNOs}</p>
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
      
      <button onClick={handleWeapons}>Ver dominio das armas</button>
      <div>
        {
          mastery && error === null ?
            <div>
              {
                mastery.map(value => (
                  <div key={value.name}>
                    <h4>{value.name}</h4>
                    <p>Nível da arma: {value.weapon.TierCurrent}</p>
                    <p>XP: {value.weapon.XPTotal}</p>
                    <p>Mortes: {value.weapon.OfficialStatsTotal.Kills}</p>
                  </div>
                ))
              }
            </div>
          :
          <>
          {
            error && error.fetch === 'handleWeapons' &&
            <p>{error?.msg}</p>
          }
          </>
        }
      </div>
      
    </>
  )
}