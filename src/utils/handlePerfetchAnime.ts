import { api } from './api'
import { queryClient } from './queryClient'

export async function handlePerfetchAnime(id: number) {
  await queryClient.prefetchQuery(
    ['anime-page', id],
    async () => {
      const { data } = await api.get(`/anime/id/${id}`)
      return data
    },
    {
      staleTime: 1000 * 60,
    },
  )
}
