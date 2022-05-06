import { QueryClient } from 'react-query'

import { getAnimeByIdOnJikan } from 'utils/http/jikan'

const queryClient = new QueryClient()

export async function handlePrefetchAnime(id: number) {
  await queryClient.prefetchQuery(['anime-by-id', id], () => getAnimeByIdOnJikan(id), {
    staleTime: 1000 * 60,
  })
}
