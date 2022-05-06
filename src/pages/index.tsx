import { lazy, Suspense } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import { useWindowSize } from 'react-use'
import { useAnimeRandom, useSelect } from 'hooks'
import { GetStaticProps } from 'next'

import { ButtonBackToComponent, Loading } from 'components'
import { Search, Title } from 'components/home'
import { getAnimeRandom, getAnimeTop } from 'utils/http/jikan'
import { getRandomAnimeQuote } from 'utils/http/quote'

const Head = lazy(() => import('next/head'))
const Quote = lazy(() => import('components/common/Quote'))
const Result = lazy(() => import('components/home/Result'))
const Ranking = lazy(() => import('components/home/Ranking'))
const Card = lazy(() => import('components/home/Card'))

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('quote', async () => getRandomAnimeQuote())
  await queryClient.prefetchQuery(['anime-result', 'random'], async () => getAnimeRandom())
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
  const { width } = useWindowSize()
  const { results } = useSelect()
  const { data: randomResult } = useAnimeRandom()

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
            <div className="w-full lg:w-2/3">
              <Suspense fallback={<Loading />}>{randomResult && <Result anime={randomResult} />}</Suspense>
            </div>
            <Suspense fallback={<Loading />}>{width >= 1024 && <Ranking type="airing" />}</Suspense>
          </div>
        </div>
        <div className="w-11/12 max-w-6xl mx-auto xl:w-9/12">
          {results ? <Title text="Results" /> : <div className="h-9" />}
          <div className="flex justify-between gap-14">
            <div className="flex flex-col w-full lg:w-2/3 gap-5">
              {results ? (
                <>
                  <Result anime={results[0]} />
                  <div className="flex flex-wrap justify-between w-full gap-5">
                    {results.slice(1, 5).map(({ id, title, imageUrl }) => (
                      <Card key={id} id={id} imageUrl={imageUrl} title={title} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full lg:w-2/3" />
              )}
            </div>
            <Suspense fallback={<Loading />}>
              {width >= 1024 && <Ranking type="bypopularity" isPopular />}
            </Suspense>
          </div>
        </div>
        <div className="flex flex-col items-center mx-auto lg:max-w-6xl lg:w-11/12 lg:pr-96">
          <ButtonBackToComponent to="top" />
        </div>
      </main>
    </>
  )
}
