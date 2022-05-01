import { Box, Flex, HStack, Stack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import BackToTop from '../components/home/BackToTop'
import Heading from '../components/home/Heading'
import { CardsProps } from '../components/home/MiniCards'
import { QuoteProps } from '../components/home/Quote'
import TopAiring from '../components/home/Ranking/TopAiring'
import TopPopular from '../components/home/Ranking/TopPopular'
import ResultCard from '../components/home/ResultCard'
import Search from '../components/home/Search'
import { useDataFetch } from '../hooks/useDataFetch'
import { AnimeQuoteData, AnimeTodayData, HomeData, WhatAnimeProps } from '../hooks/useDataFetch'
import { useSearch } from '../hooks/useSearch'
import { api } from '../utils/api'
import { SSG } from '../utils/SSG'

const MiniCards = dynamic<CardsProps>(() => import('../components/home/MiniCards'))
const QuoteComponent = dynamic<QuoteProps>(() => import('../components/home/Quote'))

export default function WhatAnime({ ID, HOME_DATA, QUOTE_DATA, ANIME_TODAY }: WhatAnimeProps) {
  const { animeResults } = useSearch()
  const animeResult = { ...animeResults[0] }

  const { AnimeToday, animeToday, topAiring, topPopular, Home, quote, Quote, title } = useDataFetch({
    ID,
    HOME_DATA,
    QUOTE_DATA,
    ANIME_TODAY,
  })

  return (
    <Box as="main" maxW={1110} minW={1050} margin="0 auto 60px">
      {!AnimeToday.isLoading && !Home.isLoading && !Quote.isLoading && (
        <>
          <Head>
            <title>WhatAnime | {title}</title>
          </Head>
          <Flex mt="25px" alignItems="center" justifyContent="space-between">
            <Search />
            <QuoteComponent
              anime={quote.anime}
              quote={quote.quote}
              character={quote.character}
              id={quote.id}
            />
          </Flex>
          <Stack as="section" spacing="20px" mt="11px">
            <Box as="article">
              <Heading title="Anime of the day" />
              <Flex mt="15px" alignItems="center" justifyContent="space-between">
                {animeToday ? <ResultCard value={animeToday} /> : <Box w="790px" h="220px" />}
                <TopAiring topAiring={topAiring} />
              </Flex>
            </Box>
            <Box as="article">
              {animeResults.length > 0 && <Heading title="Results" />}
              <Flex mt="15px" alignItems="center" justifyContent="space-between">
                <Flex height="505px" direction="column" justifyContent="space-between">
                  {animeResults.length > 0 && <ResultCard value={animeResult} />}
                  <HStack w="100%" justifyContent="space-between">
                    {animeResults.length > 1 && <MiniCards animeResults={animeResults} />}
                  </HStack>
                </Flex>
                <TopPopular topPopular={topPopular} />
              </Flex>
            </Box>
            <Flex as="div" mt="15px" w="790px" justifyContent={'center'}>
              <BackToTop />
            </Flex>
          </Stack>
        </>
      )}
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const HOME_DATA: HomeData = await api.get('/welcome').then((res: { data: HomeData }) => res.data)
  const QUOTE_DATA: AnimeQuoteData = await api.get('/quote').then((res: { data: AnimeQuoteData }) => res.data)
  const ANIME_TODAY: AnimeTodayData = await api
    .get(`/anime/id/${HOME_DATA.animeTodayID}`)
    .then((res: { data: AnimeTodayData }) => res.data)
  if (ANIME_TODAY !== undefined) {
    return {
      props: {
        ID: HOME_DATA.animeTodayID,
        HOME_DATA,
        QUOTE_DATA,
        ANIME_TODAY,
      },
      revalidate: 60 * 60 * 24,
    }
  } else {
    return {
      props: {
        home: {
          ID: 918,
          animeToday: SSG.animeToday,
          topAiring: SSG.topAiring,
          topPopular: SSG.topPopular,
        },
        revalidate: 5,
      },
    }
  }
}
