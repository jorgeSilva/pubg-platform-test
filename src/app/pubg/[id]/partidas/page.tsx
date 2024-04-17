'use client'

import { fetchApiPubgMatched, fetchApiPubgUser } from "@/actions/fetch-api-pubg-stats"
import React from "react"

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
    relationships: {
      assets: {},
      matches: {
        data: [{
          type:  'match',
          id: string
        }]
      }
    }
    type: string
  }],
  links: {},
  meta: {}
  ok: boolean
}

type IMatch = {
	data: {
		attributes: {
			createdAt: string, // Hora que este objeto foi armazenado na api
			duration: number,  // Duração da partida em segundos
			matchType: string, // Tipo de partida[airoyale, arcade, custom, event, official, seasonal, trainig]
			gameMode: "duo-fpp" | "solo" | "solo-fpp" | "squad" | "squad-fpp" | "conquest-duo" | "conquest-duo-fpp" | "conquest-solo" | "conquest-solo-fpp" | "conquest-squad" | "conquest-squad-fpp" | "esports-duo" | "esports-duo-fpp" | "esports-solo" | "esports-solo-fpp" | "esports-squad" | "esports-squad-fpp" | "lab-tpp" | "lab-fpp" | "normal-duo" | "normal-duo-fpp" | "normal-solo" | "normal-solo-fpp" | "normal-squad" | "normal-squad-fpp" | "tdm" | "war-duo" | "war-duo-fpp" | "war-solo" | "war-solo-fpp" | "war-squad" | "war-squad-fpp" | "zombie-duo" | "zombie-duo-fpp" | "zombie-solo" | "zombie-solo-fpp" | "zombie-squad" | "zombie-squad-fpp",
			mapName: string,   // Nome do mapa [ Baltic_Main, Desert_Main, DihorOtok_Main, Erangel_Main, Range_Main, Savage_Main, Summerland_Main ]
			isCustomMatch: boolean, // Verdadeiro se esta partida for personalizada
			seasonState: string, // O estado da temporada [ closed, prepare, progress ]
			shardId: string, // Fragmento de plataforma
			stats: null,
			tags: null,
			titleId: string, // Identifica o estudio e o jogo
		},
		id: string,
		links: {},
		relationships: {
			assets?: {
				data: [
					{
						type: string, // Identificador para este tipo de objeto ("assets")
						id: string, // Usado para encontrar o objeto de ativo completo na matriz incluida. 
					}
				]
			},
			rosters?: {
				data: [
					{
						type: string, // Identificador para este tipo de objeto ("roster")
						id: string, // Usado para encontrar o objeto da lista completo na matriz incluida 
					}
				]
			}
		}
		type: string
	},
	included: [
		{
			type: "roster", // 	As listas acompanham as pontuações de cada grupo adversário de participantes. As listas podem ter um ou mais participantes dependendo do modo de jogo. Os objetos de lista só são significativos no contexto de uma correspondência e não são expostos como um recurso independente.
			id: string, // Um id gerado aleatoriamente atribuido a este objeto de recurso para vinculação a outro lugar na resposta de partida
			attributes: {
				shardId: string // Fragmento de plataforma
				stats?: {
					rank: number // Minimo: 1, Maximo: 130, colocação desta escalação na partida
					teamId: number // Um Id arbitrario atribuido a esta lista 
          name?: string
				},
				won: string // Indica se esta escalação venceu a partida
			},
			relationships: {
				participants: {
					data: [
						{
							type: string, // Identificador para este tipo de objeto ("participante")
							id: string, // Use para encontrar o objeto de participante completo na matriz incluida
						}
					]
				}
			}
		},
		{
			type: "participant", // Representa um jogador no contexto da partida. Os objetos particiapntes só são significativos no contexto de uma partida e não são expostos como um recurso independente
			id: string, // Um ID gerado aleatoriamente atribuido a este objeto de recurso para vinculação em outro lugar na resposta da partida
			attributes: {
				actor: string, // N/A
				shardId: string, // Fragmento de plataforma
				stats?: {
					DBNOs: number, // Numero de jogadores derrubados,
					assists: number, // Numero de jogadores inimigos que este jogador danificou e que foram mortos por companheiros de equipe
					boosts: number, // Numero de itens de reforço utilizados
					damageDealt: number, // Dano total causado
					deathType: string, // A maneira pela qual este jogador morreu, ou vivo, se não o fez [alive, byplayer, byzone, suicide, logout] 
					headshotKills: number, // Numero de jogadores inimigos mortos com tiros na cabeça
					heals: number, // Numeros de itens de curas utilizados
					killPlace: number, // A classificação deste jogador na partida com base nas mortes
					killStreaks: number, // Numero total de mortes em sequencia
					kills: number, // Numero de jogadores mortos
					longesKill: number, // Morte mais distante
					name: string, // PUBG IGN do jogador associado a este participante
					playerId: string, // Id da conta do jogador associado a este participante
					revives: number, // Numero de vezes que este jogador reviveu companheiros de equipe
					rideDistance: number, // Distancia total percorrida em veiculos medida em metros
					roadKills: number, // Numero total de mortes enquanto estava em um veiculo
					swimDistance: number, // Distancia total percorrida enquanto nadava medida em metros
					teamKills: number, // Numero de vezes que este jogador matou um companheiro de equipe
					timeSurvived: number, // Quantidade de tempo de sobrevivencias medido em segundos
					vehicleDestroys: number, // Numero de veiculos destruidos
					walkDistance: number, // Distancia total percorrida a pe medida em metros
					weaponsAcquired: number, // Numero de armas recolhidas
					winPlace: number, // A colocação deste jogador na partida
							
				} // Estatisticas do jogador na partida
			}
		},
		{
			type: "asset", // Os objetos de ativos contêm uma string de URL vinculada a um arquivo telemetry.json, que conterá uma matriz de objetos de evento que fornecem informações adicionais sobre uma correspondência.
			id: string, // Um ID gerado aleatoriamente atribuido a este objeto de recurso para vinculação em outro lugar na resposta da partida
			attributes: {
				URL: string, // Link para arquivo telemetry.json
				createdAt: string, // Hora da criação da telemetria
				description: string, // N/A
				name: string, // Telemetria
        stats?: {
          name?: string
        }
			}			
		}
	],
	links: {self: string},
	meta: {}
}

type IPartida = {
  createdAt: string, // Hora que este objeto foi armazenado na api
  duration: number,  // Duração da partida em segundos
  matchType: string, // Tipo de partida[airoyale, arcade, custom, event, official, seasonal, trainig]
  gameMode: "duo-fpp" | "solo" | "solo-fpp" | "squad" | "squad-fpp" | "conquest-duo" | "conquest-duo-fpp" | "conquest-solo" | "conquest-solo-fpp" | "conquest-squad" | "conquest-squad-fpp" | "esports-duo" | "esports-duo-fpp" | "esports-solo" | "esports-solo-fpp" | "esports-squad" | "esports-squad-fpp" | "lab-tpp" | "lab-fpp" | "normal-duo" | "normal-duo-fpp" | "normal-solo" | "normal-solo-fpp" | "normal-squad" | "normal-squad-fpp" | "tdm" | "war-duo" | "war-duo-fpp" | "war-solo" | "war-solo-fpp" | "war-squad" | "war-squad-fpp" | "zombie-duo" | "zombie-duo-fpp" | "zombie-solo" | "zombie-solo-fpp" | "zombie-squad" | "zombie-squad-fpp",
  mapName: string,   // Nome do mapa [ Baltic_Main, Desert_Main, DihorOtok_Main, Erangel_Main, Range_Main, Savage_Main, Summerland_Main ]
  isCustomMatch: boolean, // Verdadeiro se esta partida for personalizada
  seasonState: string, // O estado da temporada [ closed, prepare, progress ]
  shardId: string, // Fragmento de plataforma
  stats: null,
  tags: null,
  titleId: string, // Identifica o estudio e o jogo
}

type IAsset = {
  type: "asset",
  id: string, 
  attributes: {
    URL: string, 
    createdAt: string, 
    description: string, 
    name: string,
  }			
}

type IParticipant = {
  type: "participant", 
  id: string, 
  attributes: {
    actor: string, 
    shardId: string,
    stats?: {
      DBNOs: number,
      assists: number,
      boosts: number,
      damageDealt: number,
      deathType: string,
      headshotKills: number,
      heals: number,
      killPlace: number,
      killStreaks: number,
      kills: number,
      longesKill: number,
      name: string,
      playerId: string,
      revives: number,
      rideDistance: number,
      roadKills: number,
      swimDistance: number,
      teamKills: number,
      timeSurvived: number,
      vehicleDestroys: number,
      walkDistance: number,
      weaponsAcquired: number,
      winPlace: number,		
    } 
  }
}

type IRoster = {
  type: "roster", 
  id: string, 
  attributes: {
    shardId: string 
    stats?: {
      rank: number 
      teamId: number
      name?: string
    },
    won: string 
  },
  relationships: {
    participants: {
      data: [
        {
          type: string, 
          id: string,
        }
      ]
    }
  }
}

export default function PartidasPage({params}: any){

  const [matches, setMatches] = React.useState<[{type: string, id: string}] | null>(null)
  const [resultMatches, setResultMathces] = React.useState<IMatch | null>(null)
  const [telemetry, setTelemetry] = React.useState<IAsset | null>(null)
  const [partida, setPartida] = React.useState<IPartida | null>(null)
  const [perfilPartida, setPerfilPartida] = React.useState<IParticipant | IRoster | IAsset | null>(null)

  async function handledata(){
    const response: IUser = await fetchApiPubgUser(params.id)
    setMatches(response.data[0].relationships.matches.data)
  }

  async function handleMatched(id: string, platform: string){
    const response: IMatch = await fetchApiPubgMatched(id, platform)
    const typeTelemetry = "asset"

    response.included.forEach((item) => {
      if(item.type === typeTelemetry){
        setTelemetry(item)
      }
      if(item.attributes.stats?.name === params.id){
        setPerfilPartida(item)
      }
    })

    setPartida(response.data.attributes)
    setResultMathces(response)
  }

  // console.log(perfilPartida?.attributes.stats)

  React.useEffect(() => {
    handledata()
  }, [])

  return (
    <>
      <h1>Veja todas as partidas jogadas em 14 dias.</h1>
      <p>Selecione na ordem da <b>Ultima partida jogada</b> sendo a 1°.<br /> Até a <b>Primeira partida jogada</b> sendo a ultima opção.</p>
      <select name="match" id="match" onChange={({target}) => handleMatched(String(target.value), 'steam')}>
        <option value={0}></option>
        {
          matches?.map((item, index) => (
            <option key={item.id} value={item.id}>{index+1}° partida</option>
          ))
        }
      </select>

      <div>
        <h1>Partida</h1>
        <div>
          <p>Duração da partida: {partida?.duration}</p>
          <p>Modo de jogo: {partida?.gameMode}</p>
          <p>Mapa: {partida?.mapName}</p>
        </div>

        <h2>Sua estatistica na partida</h2>
        <div>
          {
            perfilPartida?.attributes && 'stats' in perfilPartida?.attributes ? 
            <div>
              <p>Nome: {perfilPartida?.attributes.stats && 'name' in perfilPartida?.attributes.stats ? perfilPartida?.attributes.stats?.name : null}</p>
              <p>Colocação: {perfilPartida?.attributes.stats && 'winPlace' in perfilPartida?.attributes.stats ? perfilPartida?.attributes.stats?.winPlace : null}°</p>
              <p>Nocautes: {perfilPartida?.attributes.stats && 'DBNOs' in perfilPartida?.attributes.stats ? perfilPartida?.attributes.stats?.DBNOs : null}</p>
              <p>Mortes: {perfilPartida?.attributes.stats && 'kills' in perfilPartida?.attributes.stats ? perfilPartida?.attributes.stats?.kills : null}</p>
              <p>Assistencias: {perfilPartida?.attributes.stats && 'assists' in perfilPartida?.attributes.stats ? perfilPartida?.attributes.stats?.assists : null}</p>
              <p>Dano causado: {perfilPartida?.attributes.stats && 'damageDealt' in perfilPartida?.attributes.stats ? perfilPartida?.attributes.stats?.damageDealt : null}</p>
              <p>Tiros na cabeça: {perfilPartida?.attributes.stats && 'headshotKills' in perfilPartida?.attributes.stats ? perfilPartida?.attributes.stats?.headshotKills : null}</p>
              <p>Morte mais distante: {perfilPartida?.attributes.stats && 'longesKill' in perfilPartida?.attributes.stats ? perfilPartida?.attributes.stats?.longesKill : null}</p>
              <p>Reviveu companheiros: {perfilPartida?.attributes.stats && 'revives' in perfilPartida?.attributes.stats ? perfilPartida?.attributes.stats?.revives : null}</p>
              <p>Distancia percorrida de carro: {perfilPartida?.attributes.stats && 'rideDistance' in perfilPartida?.attributes.stats ? perfilPartida?.attributes.stats?.rideDistance : null}m</p>
              <p>Distancia percorrida apé: {perfilPartida?.attributes.stats && 'walkDistance' in perfilPartida?.attributes.stats ? perfilPartida?.attributes.stats?.walkDistance : null}m</p>
            </div>
             : null 
          }

          {/* 

            DBNOs: number, // Numero de jogadores derrubados,
            assists: number, // Numero de jogadores inimigos que este jogador danificou e que foram mortos por companheiros de equipe
            boosts: number, // Numero de itens de reforço utilizados
            damageDealt: number, // Dano total causado
            deathType: string, // A maneira pela qual este jogador morreu, ou vivo, se não o fez [alive, byplayer, byzone, suicide, logout] 
            headshotKills: number, // Numero de jogadores inimigos mortos com tiros na cabeça
            heals: number, // Numeros de itens de curas utilizados
            killPlace: number, // A classificação deste jogador na partida com base nas mortes
            killStreaks: number, // Numero total de mortes em sequencia
            kills: number, // Numero de jogadores mortos
            longesKill: number, // Morte mais distante
            name: string, // PUBG IGN do jogador associado a este participante
            playerId: string, // Id da conta do jogador associado a este participante
            revives: number, // Numero de vezes que este jogador reviveu companheiros de equipe
            rideDistance: number, // Distancia total percorrida em veiculos medida em metros
            roadKills: number, // Numero total de mortes enquanto estava em um veiculo
            swimDistance: number, // Distancia total percorrida enquanto nadava medida em metros
            teamKills: number, // Numero de vezes que este jogador matou um companheiro de equipe
            timeSurvived: number, // Quantidade de tempo de sobrevivencias medido em segundos
            vehicleDestroys: number, // Numero de veiculos destruidos
            walkDistance: number, // Distancia total percorrida a pe medida em metros
            weaponsAcquired: number, // Numero de armas recolhidas
            winPlace: number, // A colocação deste jogador na partida

          */}
        </div>
      </div>
    </>
  )
}