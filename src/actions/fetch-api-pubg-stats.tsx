'use server'

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3Y2U1YzczMC1jYTg4LTAxM2MtZWJhNS0zNjg3NTE2NDZiZTIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzExMTE4NjE2LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii0zYzlhZWUxNS02ZjAyLTQ5MzYtYjU5NC0xYjZmNTcxZjMzMTEifQ.JId6M-0Ow5yoE1cRmHsV8QuTgmOji0FcnK7FPSSBIEs"

export async function fetchApiPubgUser(params: string){
  try{
    const response = await fetch(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${params}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/vnd.api+json'
      }
    })
    
    const data = await response.json()
    
    return data
  }catch(error){
    return {ok: false, error}
  }
}

export async function fetchApiPubgStats(params: string, platform: string) {
  try{
    const stats = await fetch(`https://api.pubg.com/shards/${platform}/players/${params}/seasons/lifetime?filter[gamepad]=false`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/vnd.api+json'
      }
    })

    const data_stats = await stats.json()

    return data_stats
  }catch(error){
    return {ok: false, error}
  }
}

export async function fetchApiPubgMastery(params: string) {
  try{
    const mastery = await fetch(`https://api.pubg.com/shards/steam/players/${params}/weapon_mastery`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/vnd.api+json'
      }
    })

    const data_mastery = await mastery.json()

    return data_mastery
  }catch(error){
    return {ok: false, error}
  }
}

// CLAN
// https://api.pubg.com/shards/steam/clans/clan.c1bc11f97a954a6ab72318bc56f860d2

// MATCHES
// https://api.pubg.com/shards/steam/matches/2d5b84e7-9afb-48d2-a3d8-2802a22f7453

// RANKED STATS
// https://api.pubg.com/shards/steam/players/account.dea796afe873415a817c88d9c98a4340/seasons/division.bro.official.pc-2018-28/ranked

// SEASON STAS
// https://api.pubg.com/shards/steam/players/account.dea796afe873415a817c88d9c98a4340/seasons/division.bro.official.pc-2018-29?filter[gamepad]=false
