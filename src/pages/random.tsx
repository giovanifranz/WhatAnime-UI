import { useAnimeRandom } from 'hooks'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { IAnime } from 'types'

import { AnimeTemplate } from 'components/anime/Template'
import { getAnimeRandom } from 'utils/http'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-Control', 's-maxage=59, stale-while-revalidate')

  return {
    props: {
      randomAnime: await getAnimeRandom(),
    },
  }
}

interface Props {
  randomAnime: IAnime
}

export default function AnimePage({ randomAnime }: Props) {
  const router = useRouter()

  const { isLoading, isError, data } = useAnimeRandom(randomAnime)

  if (isLoading || !data) {
    return null
  }

  if (isError) router.push('/404')

  return <AnimeTemplate anime={data} />
}
