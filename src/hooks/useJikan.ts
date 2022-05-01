import { useQuery } from 'react-query'
import { IAnime } from 'types/anime'

import {
  getAnimeByIdOnJikan,
  getAnimeRandom,
  getAnimesByTitleOnJikan,
  getAnimeTop,
} from 'utils/http/jikan/jikan-resource'

export function cacheAnimesByTitleOnJikan(animes: IAnime[], title: string) {
  return useQuery<IAnime[]>('anime-by-title', async () => getAnimesByTitleOnJikan(title), {
    initialData: animes,
  })
}

export function cacheAnimeByIdOnJikan(anime: IAnime, id: number) {
  return useQuery<IAnime>('anime-by-id', async () => getAnimeByIdOnJikan(id), {
    initialData: anime,
  })
}

export function cacheAnimeRandom(anime: IAnime) {
  return useQuery<IAnime>('anime-random', async () => getAnimeRandom(), {
    initialData: anime,
  })
}

export function cacheAnimeTopByPopularity(animes: IAnime[]) {
  return useQuery<IAnime[]>('anime-top-by-popularity', async () => getAnimeTop('bypopularity'), {
    initialData: animes,
  })
}

export function cacheAnimeTopByAiring(animes: IAnime[]) {
  return useQuery<IAnime[]>('anime-top-by-airing', async () => getAnimeTop('airing'), {
    initialData: animes,
  })
}
