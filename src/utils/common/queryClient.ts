import { QueryClient } from 'react-query'

import { getAnimeByIdOnJikan } from 'utils/http/jikan/jikan-resource'

const queryClient = new QueryClient()

export async function handlePrefetchAnime(id: number) {
  await queryClient.prefetchQuery(['anime-page', id], () => getAnimeByIdOnJikan(id), {
    staleTime: 1000 * 60,
  })
}
