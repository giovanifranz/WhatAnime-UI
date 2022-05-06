import { useEffect, useState } from 'react'
import { useAnimeByIdOnJikan } from 'hooks'
import { useRouter } from 'next/router'

import { AnimeTemplate } from 'components/anime/Template'

export default function AnimePage() {
  const router = useRouter()
  const { id } = router.query
  const [animeId, setAnimeId] = useState(0)

  useEffect(() => {
    if (id !== undefined) {
      const numberId = parseInt(id as string, 10)

      if (Number.isNaN(numberId)) {
        router.push('/404')
      }

      setAnimeId(numberId)
    }
  }, [id])

  const { isLoading, isError, data } = useAnimeByIdOnJikan(animeId, undefined)

  if (isLoading || !data) {
    return null
  }

  if (isError) router.push('/404')

  return <AnimeTemplate anime={data} />
}
