import axios from 'axios'
import { IAnime, IResponseAnime, TFilter } from 'types/anime'

import { queryClient } from '../../common'

const jikanAPI = 'https://api.jikan.moe/v4'

function animeMapper(response: IResponseAnime): IAnime {
  return {
    mal_id: response.mal_id,
    title: response.title.toLowerCase(),
    title_english: response.title_english,
    title_japanese: response.title_japanese,
    score: response.score,
    type: response.type,
    source: response.source,
    image_url: response.images.jpg.image_url,
    status: response.status,
    duration: response.duration,
    premiered: response.premiered,
    rating: response.rating,
    episodes: response.episodes,
    year: response.year ? response.year : response.aired.prop.from.year,
    aired_string: response.aired.string,
    synopsis: response.synopsis ? response.synopsis.replace(' [Written by MAL Rewrite]', '') : null,
  }
}

export async function getAnimesByTitleOnJikan(title: string): Promise<IAnime[]> {
  return axios.get(`${jikanAPI}/anime?q=${title}&order_by=score&&sort=desc`).then(({ data: results }) => {
    const { data } = results
    return data.slice(0, 6).map((response: IResponseAnime) => animeMapper(response))
  })
}

export async function getAnimeByIdOnJikan(id: number): Promise<IAnime> {
  return axios.get(`${jikanAPI}/anime/${id}`).then(({ data }) => {
    const { data: response } = data
    return animeMapper(response)
  })
}

export async function getAnimeRandom(): Promise<IAnime> {
  return axios.get(`${jikanAPI}/random/anime`).then(({ data }) => {
    const { data: response } = data
    return animeMapper(response as IResponseAnime)
  })
}

export async function getAnimeTop(filter: TFilter): Promise<IAnime[]> {
  const qtd = filter === 'airing' ? 5 : 10

  return axios.get(`${jikanAPI}/top/anime/?filter=${filter}`).then(({ data }) => {
    const { data: results } = data
    return results.data.slice(0, qtd).map((response: IResponseAnime) => animeMapper(response))
  })
}

export async function handlePrefetchAnime(id: number) {
  await queryClient.prefetchQuery(['anime-page', id], () => getAnimeByIdOnJikan(id), {
    staleTime: 1000 * 60,
  })
}
