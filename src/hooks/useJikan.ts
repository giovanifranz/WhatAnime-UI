import { useQuery } from 'react-query'
import { IAnime } from 'types/anime'

import {
  getAnimeByIdOnJikan,
  getAnimeRandom,
  getAnimesByTitleOnJikan,
  getAnimeTop,
} from 'utils/http/jikan/jikan-resource'

export function cacheAnimesByTitleOnJikan(animes: IAnime[] | undefined, title: string) {
  return useQuery<IAnime[]>(['anime-by-title', title], async () => getAnimesByTitleOnJikan(title), {
    initialData: animes,
  })
}

export function cacheAnimeByIdOnJikan(anime: IAnime | undefined, id: number) {
  return useQuery<IAnime>(['anime-by-id', id], async () => getAnimeByIdOnJikan(id), {
    initialData: anime,
  })
}

export function cacheAnimeRandom(anime: IAnime | undefined) {
  return useQuery<IAnime>('anime-random', async () => getAnimeRandom(), {
    initialData: anime,
  })
}

export function cacheAnimeTopByPopularity(animes: IAnime[] | undefined) {
  return useQuery<IAnime[]>(
    ['anime-top-by-popularity', 'popularity'],
    async () => getAnimeTop('bypopularity'),
    {
      initialData: animes,
    },
  )
}

export function cacheAnimeTopByAiring(animes: IAnime[] | undefined) {
  return useQuery<IAnime[]>(['anime-top-by-airing', 'airing'], async () => getAnimeTop('airing'), {
    initialData: animes,
  })
}
