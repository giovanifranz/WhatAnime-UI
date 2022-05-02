import { Box, Flex, Stack, useBreakpointValue } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { IAnime } from 'types/anime'
import { IQuote } from 'types/quote'

import { QuoteProps, Ranking, Result, Search, Title } from 'components/home'
import { getAnimeRandom, getAnimeTop } from 'utils/http/jikan/jikan-resource'
import { getRandomAnimeQuote } from 'utils/http/quote/quote-resource'

const Quote = dynamic<QuoteProps>(() => import('components/home/Quote').then((module) => module.Quote))

interface Props {
  quote?: IQuote
  animeToday?: IAnime
  airing?: IAnime[]
  popular?: IAnime[]
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    quote: await getRandomAnimeQuote(),
    animeToday: await getAnimeRandom(),
    airing: await getAnimeTop('airing'),
    popular: await getAnimeTop('bypopularity'),
  } as Props,
  revalidate: 60 * 60 * 60 * 24,
})

export default function Home({ quote, animeToday, airing, popular }: Props) {
  console.log(popular)

  const isWideVersion = useBreakpointValue({
    base: false,
    md: false,
    lg: false,
    xl: true,
  })

  return (
    <Stack w="full" spacing="30px" alignItems="center" py="30px">
      <Flex w={['95%', '70%']} mx="auto" alignItems="center" justifyContent="space-between">
        <Search />
        {isWideVersion && <Quote quote={quote} />}
      </Flex>
      <Box w={['95%', '70%']} mx="auto">
        <Title text="anime of the day" />
        <Flex alignItems="center" justifyContent="space-between">
          <Result isAnimeToday anime={animeToday} />
          <Ranking type="airing" value={airing} />
        </Flex>
      </Box>
    </Stack>
  )
}
