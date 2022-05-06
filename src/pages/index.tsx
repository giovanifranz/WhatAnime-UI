import { dehydrate, QueryClient } from 'react-query'
import { GetStaticProps } from 'next'

import { HomeTemplate } from 'components/home/Template'
import { getAnimeTop } from 'utils/http/jikan'
import { getRandomAnimeQuote } from 'utils/http/quote'

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('quote', async () => getRandomAnimeQuote())
  await queryClient.prefetchQuery('airing', async () => getAnimeTop('airing'))
  await queryClient.prefetchQuery('bypopularity', async () => getAnimeTop('bypopularity'))

  return {
    props: {
      id: Math.floor(Math.random() * 120 + 1),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 60 * 60 * 60 * 24,
  }
}

interface Props {
  id: number
}

export default function Home({ id }: Props) {
  return <HomeTemplate id={id} />
}
