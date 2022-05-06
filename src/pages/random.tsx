import { useWindowSize } from 'react-use'
import { useAnimeRandom } from 'hooks'
import { useRouter } from 'next/router'

import { AnimeTemplate } from 'components/anime/Template'

export default function AnimePage() {
  const router = useRouter()
  const { width } = useWindowSize()
  const { isLoading, isError, data } = useAnimeRandom()

  if (isLoading || !data) {
    return null
  }

  if (isError) router.push('/404')

  return <AnimeTemplate anime={data} width={width} />
}
