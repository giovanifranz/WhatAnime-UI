import { dehydrate, QueryClient } from 'react-query'
import { GetServerSideProps } from 'next'

import { HomeTemplate } from 'components/home/Template'
import { getAnimeRandom, getAnimeTop } from 'utils/http/jikan'
import { getRandomAnimeQuote } from 'utils/http/quote'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('quote', async () => getRandomAnimeQuote())
  await queryClient.prefetchQuery('airing', async () => getAnimeTop('airing'))
  await queryClient.prefetchQuery('bypopularity', async () => getAnimeTop('bypopularity'))
  await queryClient.prefetchQuery(['anime-result', 'random'], async () => getAnimeRandom())

  return {
    props: {
      id: Math.floor(Math.random() * 120 + 1),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

interface Props {
  id: number
}

export default function Home({ id }: Props) {
  return <HomeTemplate id={id} />
}
