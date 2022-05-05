import axios from 'axios'
import { IAnime, IResponseAnime } from 'types/anime'

import { animeMapper } from 'utils/common'

const jikanAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JIKAN_API_URL,
})

export async function getAnimesByTitleOnJikan(title: string): Promise<IAnime[]> {
  const animes: IResponseAnime[] = await jikanAPI
    .get(`anime?q=${title}&order_by=score&&sort=desc`)
    .then(({ data: results }) => results.data)
  return animes.slice(0, 6).map((response: IResponseAnime) => animeMapper(response))
}

export async function getAnimeByIdOnJikan(id: number): Promise<IAnime> {
  const anime: IResponseAnime = await jikanAPI.get(`anime/${id}`).then(({ data }) => {
    const { data: response } = data
    return response
  })
  return animeMapper(anime)
}

export async function getAnimeRandom(): Promise<IAnime> {
  const id = Math.floor(Math.random() * 120 + 1)
  return getAnimeByIdOnJikan(id).then((anime) => anime)
}

export async function getAnimeTop(filter: TFilter) {
  const qtd = filter === 'airing' ? 5 : 10
  const animes: IResponseAnime[] = await jikanAPI
    .get(`top/anime?filter=${filter}`)
    .then(({ data: results }) => results.data)
  return animes.slice(0, qtd).map((response: IResponseAnime) => animeMapper(response))
}
