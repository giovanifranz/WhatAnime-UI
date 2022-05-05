import { useQuery } from 'react-query'
import { IAnime } from 'types/anime'

import { formatSlug } from 'utils/common'
import { getAnimeByIdOnJikan, getAnimeRandom, getAnimesByTitleOnJikan, getAnimeTop } from 'utils/http/jikan'

export function useAnimesByTitleOnJikan(title: string) {
  return useQuery<IAnime[]>(['anime-by-title', formatSlug(title)], async () => getAnimesByTitleOnJikan(title))
}

export function useAnimeByIdOnJikan(anime: IAnime | undefined, id: number) {
  return useQuery<IAnime>(['anime-by-id', id], async () => getAnimeByIdOnJikan(id), {
    initialData: anime,
  })
}

export function useAnimeRandom() {
  return useQuery<IAnime>('anime-random', async () => getAnimeRandom(), {
    staleTime: 1000 * 60 * 60 * 60 * 24,
  })
}

export function useAnimeTop(filter: TFilter) {
  return useQuery<IAnime[]>(filter, async () => getAnimeTop(filter), {
    staleTime: 1000 * 60 * 60 * 60 * 24,
  })
}
