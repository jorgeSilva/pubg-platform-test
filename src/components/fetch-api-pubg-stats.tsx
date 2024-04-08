'use client'

export default async function FetchApiPubgStats({params}: {params: string}){
  
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3Y2U1YzczMC1jYTg4LTAxM2MtZWJhNS0zNjg3NTE2NDZiZTIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzExMTE4NjE2LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii0zYzlhZWUxNS02ZjAyLTQ5MzYtYjU5NC0xYjZmNTcxZjMzMTEifQ.JId6M-0Ow5yoE1cRmHsV8QuTgmOji0FcnK7FPSSBIEs"

  const response = await fetch(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${params}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/vnd.api+json'
    }
  })

  const stats = await fetch('https://api.pubg.com/shards/steam/players/account.dea796afe873415a817c88d9c98a4340/seasons/lifetime?filter[gamepad]=false', {
    method: 'GET',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/vnd.api+json'
    }
  })

  const data = await response.json()
  const data_stats = await stats.json()

  console.log(data);
  
  return(
    <div>
      <h1>Stats</h1>
    </div>
  )
}