import axios from 'axios'
import { IAnime, IResponseAnime, TFilter } from 'types/anime'

import { queryClient } from '../../common'

const jikanAPI = 'https://api.jikan.moe/v4'

function animeMapper(response: IResponseAnime): IAnime {
  return {
    id: response.mal_id,
    title: response.title,
    titleEnglish: response.title_english,
    titleJapanese: response.title_japanese,
    score: response.score || null,
    type: response.type,
    source: response.source,
    imageUrl: response.images.jpg.image_url,
    status: response.status,
    duration: response.duration,
    premiered: response.premiered || null,
    rating: response.rating,
    episodes: response.episodes || null,
    year: response.year ? response.year : response.aired.prop.from.year,
    airedString: response.aired.string,
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
  const id = Math.floor(Math.random() * 120 + 1)
  return getAnimeByIdOnJikan(id).then((anime) => anime)
}

export async function getAnimeTop(filter: TFilter) {
  const qtd = filter === 'airing' ? 5 : 10
  return axios
    .get(`${jikanAPI}/top/anime?filter=${filter}`)
    .then(({ data }) => data.data.slice(0, qtd).map((response: IResponseAnime) => animeMapper(response)))
}

export async function handlePrefetchAnime(id: number) {
  await queryClient.prefetchQuery(['anime-page', id], () => getAnimeByIdOnJikan(id), {
    staleTime: 1000 * 60,
  })
}
