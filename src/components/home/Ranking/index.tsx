import { useCallback } from 'react'
import { Box, Link, ListItem, OrderedList, Stack, Text } from '@chakra-ui/react'
import { useAnimeTopByAiring, useAnimeTopByPopularity } from 'hooks/useJikan'
import { IAnime, TFilter } from 'types/anime'

import { handlePrefetchAnime } from 'utils/http/jikan/jikan-resource'

import Heading from './Heading'

interface Props {
  value?: IAnime[]
  type: TFilter
}

export function Ranking({ value, type }: Props) {
  const useRanking = useCallback(() => {
    if (type === 'bypopularity') {
      return useAnimeTopByPopularity(value)
    }
    return useAnimeTopByAiring(value)
  }, [type])

  const { isLoading, isError, data } = useRanking()

  if (isLoading || isError || !data) {
    return null
  }

  return (
    <Box w="250px" h="220.5px" bgColor="white" border="1px solid black" borderRadius="5px">
      <Heading title={type === 'airing' ? 'Top Airing' : 'Most Popular'} />
      <OrderedList ml="40px" fontSize="16px" lineHeight="19px" color="black">
        <Stack mt="16px" spacing="10px">
          {data.map(({ id, title }) => (
            <ListItem key={id}>
              <Link href={`/${id}`} onMouseEnter={() => handlePrefetchAnime(id)}>
                <Text isTruncated maxW="190px">
                  {title}
                </Text>
              </Link>
            </ListItem>
          ))}
        </Stack>
      </OrderedList>
    </Box>
  )
}
