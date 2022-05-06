import { lazy, Suspense } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import { useWindowSize } from 'react-use'
import { useAnimeByIdOnJikan, useAnimeRandom, useSelect } from 'hooks'
import { GetStaticProps } from 'next'
import { IAnime } from 'types/anime'

import { ButtonBackToComponent, Loading } from 'components'
import { Search, Title } from 'components/home'
import { getAnimeRandom, getAnimeTop } from 'utils/http/jikan'
import { getRandomAnimeQuote } from 'utils/http/quote'

const Head = lazy(() => import('next/head'))
const Quote = lazy(() => import('components/common/Quote'))
const Result = lazy(() => import('components/home/Result'))
const Ranking = lazy(() => import('components/home/Ranking'))

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('quote', async () => getRandomAnimeQuote())
  await queryClient.prefetchQuery('airing', async () => getAnimeTop('airing'))
  await queryClient.prefetchQuery('bypopularity', async () => getAnimeTop('bypopularity'))

  return {
    props: {
      random: await getAnimeRandom(),
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 60 * 24,
  }
}

interface Props {
  random?: IAnime
}

export default function Home({ random }: Props) {
  const { width } = useWindowSize()
  const { results } = useSelect()
  const { data: randomResult } = random ? useAnimeByIdOnJikan(random.id, random) : useAnimeRandom()

  return (
    <>
      {randomResult && (
        <Head>
          <title>WhatAnime | {randomResult.title}</title>
        </Head>
      )}
      <main className="flex flex-col py-5 gap-5">
        <div className="flex justify-between w-11/12 max-w-6xl mx-auto gap-14 xl:w-9/12">
          <Search />
          <Suspense fallback={<Loading />}>{width >= 1024 && <Quote />}</Suspense>
        </div>
        <div className="w-11/12 max-w-6xl mx-auto xl:w-9/12">
          <Title text="Anime of the day" />
          <div className="flex justify-between gap-14">
            <Suspense fallback={<Loading />}>{randomResult && <Result anime={randomResult} />}</Suspense>
            <Suspense fallback={<Loading />}>{width >= 1024 && <Ranking type="airing" />}</Suspense>
          </div>
        </div>
        <div className="w-11/12 max-w-6xl mx-auto xl:w-9/12">
          {results && <Title text="Results" />}
          <div className="flex justify-between gap-14">
            {results ? <Result anime={results[0]} /> : <div className="flex w-full h-64  lg:w-2/3" />}
            <Suspense fallback={<Loading />}>{width >= 1024 && <Ranking type="bypopularity" />}</Suspense>
          </div>
        </div>
        <div className="flex flex-col items-center mx-auto lg:max-w-6xl lg:w-11/12 lg:pr-96">
          <ButtonBackToComponent to="top" />
        </div>
      </main>
    </>
  )
}
