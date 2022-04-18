import { Box, Link, List, OrderedList, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

import { handlePerfetchAnime } from '../../../utils/handlePerfetchAnime'

import Heading from './Heading'

interface RankingProps {
  topPopular: Array<Top>
}

interface Top {
  mal_id: number
  title: string
  rank: number
}

export default function Popular({ topPopular }: RankingProps) {
  return (
    <Box w="250px" bgColor="white" border="1px solid black" borderRadius="5px" h="505px">
      <Heading title="Most Popular" />
      <OrderedList
        ml="25px"
        fontStyle="normal"
        fontWeight="normal"
        fontSize="16px"
        lineHeight="19px"
        color="black"
      >
        <Stack mt="16px" spacing="18px">
          {topPopular &&
            topPopular.map((anime) => {
              return (
                <List key={anime.mal_id}>
                  <NextLink href={`/${anime.mal_id}`}>
                    <Link onMouseEnter={() => handlePerfetchAnime(anime.mal_id)}>
                      <Text maxW="100%">
                        {anime.rank}. {anime.title}
                      </Text>
                    </Link>
                  </NextLink>
                </List>
              )
            })}
        </Stack>
      </OrderedList>
    </Box>
  )
}
