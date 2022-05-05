import axios from 'axios'
import { IAnime, IResponseAnime, TFilter } from 'types/anime'

import { isDevEnvironment } from 'utils'

const IS_DEV = isDevEnvironment()

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
    rating: response.rating,
    episodes: response.episodes || null,
    year: response.year ? response.year : response.aired.prop.from.year,
    airedString: response.aired.string,
    synopsis: response.synopsis ? response.synopsis.replace(' [Written by MAL Rewrite]', '') : null,
  }
}

export async function getAnimesByTitleOnJikan(title: string): Promise<IAnime[]> {
  const param = IS_DEV ? 'naruto' : title
  const animes: IResponseAnime[] = await axios
    .get(`${jikanAPI}/anime?q=${param}&order_by=score&&sort=desc`)
    .then(({ data: results }) => results.data)
  return animes.slice(0, 6).map((response: IResponseAnime) => animeMapper(response))
}

export async function getAnimeByIdOnJikan(id: number): Promise<IAnime> {
  const param = IS_DEV ? '21' : id
  const anime: IResponseAnime = await axios.get(`${param}/anime/${id}`).then(({ data }) => {
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
  const query = IS_DEV ? 'airing' : filter
  const qtd = query === 'airing' ? 5 : 10

  const animes: IResponseAnime[] = await axios
    .get(`${jikanAPI}/top/anime?filter=${query}`)
    .then(({ data: results }) => results.data)
  return animes.slice(0, qtd).map((response: IResponseAnime) => animeMapper(response))
}
