'use server'

export async function fetchApiPubgUser(params: string){
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3Y2U1YzczMC1jYTg4LTAxM2MtZWJhNS0zNjg3NTE2NDZiZTIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzExMTE4NjE2LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii0zYzlhZWUxNS02ZjAyLTQ5MzYtYjU5NC0xYjZmNTcxZjMzMTEifQ.JId6M-0Ow5yoE1cRmHsV8QuTgmOji0FcnK7FPSSBIEs"

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
}

export async function fetchApiPubgStats(params: string) {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3Y2U1YzczMC1jYTg4LTAxM2MtZWJhNS0zNjg3NTE2NDZiZTIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzExMTE4NjE2LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii0zYzlhZWUxNS02ZjAyLTQ5MzYtYjU5NC0xYjZmNTcxZjMzMTEifQ.JId6M-0Ow5yoE1cRmHsV8QuTgmOji0FcnK7FPSSBIEs"
  
  const stats = await fetch(`https://api.pubg.com/shards/steam/players/${params}/seasons/lifetime?filter[gamepad]=false`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/vnd.api+json'
    }
  })

  const data_stats = await stats.json()

  return data_stats
}