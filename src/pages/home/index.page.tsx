import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { IAnime } from 'types/anime'
import { IQuote } from 'types/quote'

import { QuoteProps, Result, Search } from 'components/home'
import { getAnimeRandom } from 'utils/http/jikan/jikan-resource'
import { getRandomAnimeQuote } from 'utils/http/quote/quote-resource'

const Quote = dynamic<QuoteProps>(() => import('components/home/Quote').then((module) => module.Quote))

interface Props {
  quote?: IQuote
  animeToday?: IAnime
}

export const getStaticProps: GetStaticProps = async () => {
  const quote = await getRandomAnimeQuote()
  const animeToday = await getAnimeRandom()

  return {
    props: {
      quote,
      animeToday,
    } as Props,
    revalidate: 60 * 60 * 60 * 24,
  }
}

export default function Home({ quote, animeToday }: Props) {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: false,
    lg: false,
    xl: true,
  })

  return (
    <Box w="full">
      <Flex w={['95%', '70%']} mx="auto" my="30px" alignItems="center" justifyContent="space-between">
        <Search />
        {isWideVersion && <Quote quote={quote} />}
      </Flex>
      <Flex w={['95%', '70%']} mx="auto" my="30px" alignItems="center" justifyContent="space-between">
        <Result isAnimeToday anime={animeToday} />
      </Flex>
    </Box>
  )
}
