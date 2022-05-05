import { lazy, Suspense } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import { useAnimeRandom } from 'hooks/useJikan'
import { useWindowsSize } from 'hooks/useWindowsSize'
import { GetStaticProps } from 'next'
import Head from 'next/head'

import { ButtonBackToComponent, Loading } from 'components'
import { Search, Title } from 'components/home'
import { getAnimeRandom, getAnimeTop } from 'utils/http/jikan/jikan-resource'
import { getRandomAnimeQuote } from 'utils/http/quote/quote-resource'

const Quote = lazy(() => import('components/home/Quote'))
const Result = lazy(() => import('components/home/Result'))
const Ranking = lazy(() => import('components/home/Ranking'))

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('quote', async () => getRandomAnimeQuote())
  await queryClient.prefetchQuery('anime-random', async () => getAnimeRandom())
  await queryClient.prefetchQuery('airing', async () => getAnimeTop('airing'))
  await queryClient.prefetchQuery('bypopularity', async () => getAnimeTop('bypopularity'))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 60 * 24,
  }
}

export default function Home() {
  const { width } = useWindowsSize()

  const { data: animeRandom } = useAnimeRandom()

  return (
    <>
      <Head>
        <title>{animeRandom ? `WhatAnime | ${animeRandom.title}` : 'WhatAnime'}</title>
      </Head>
      <main className="flex flex-col gap-5 py-5 bg-zinc-200">
        <div className="flex gap-14 mx-auto w-11/12 xl:w-9/12 max-w-6xl justify-between">
          <Search />
          <Suspense fallback={<Loading />}>{width >= 1024 && <Quote />}</Suspense>
        </div>
        <div className="mx-auto w-11/12 xl:w-9/12 max-w-6xl">
          <Title text="Anime of the day" />
          <div className="flex gap-14  justify-between">
            <Suspense fallback={<Loading />}>
              <Result anime={animeRandom} isRandom />
            </Suspense>
            <Suspense fallback={<Loading />}>{width >= 1024 && <Ranking type="airing" />}</Suspense>
          </div>
        </div>
        <div className="lg:max-w-6xl lg:w-11/12 mx-auto lg:pr-96 flex flex-col items-center">
          <ButtonBackToComponent to="top" />
        </div>
      </main>
    </>
  )
}
