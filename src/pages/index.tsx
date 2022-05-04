import { useWindowsSize } from 'hooks/useWindowsSize'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { IAnime, IQuote } from 'types'

import { ButtonBackToComponent } from 'components'
import { QuoteProps, Ranking, Result, Search, Title } from 'components/home'
import { getAnimeRandom, getAnimeTop } from 'utils/http/jikan/jikan-resource'
import { getRandomAnimeQuote } from 'utils/http/quote/quote-resource'

const Quote = dynamic<QuoteProps>(() => import('components/home/Quote').then((module) => module.Quote))

interface Props {
  quote?: IQuote
  animeToday?: IAnime
  airing?: IAnime[]
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    quote: await getRandomAnimeQuote(),
    animeToday: await getAnimeRandom(),
    airing: await getAnimeTop('airing'),
  } as Props,
  revalidate: 60 * 60 * 60 * 24,
})

export default function Home({ quote, animeToday, airing }: Props) {
  const { width } = useWindowsSize()

  return (
    <>
      <Head>
        <title>{animeToday ? `WhatAnime | ${animeToday.title}` : 'WhatAnime'}</title>
      </Head>
      <div className="bg-zinc-100 flex gap-14 mx-auto w-11/12 xl:w-9/12 max-w-6xl ">
        <Result anime={animeToday} />
        {width > 768 && <Ranking type="airing" value={airing} />}
      </div>
    </>
  )
}
