import { memo, useCallback } from 'react'
import { Box, Flex, Link, ListItem, OrderedList, Stack, Text } from '@chakra-ui/react'
import { useAnimeTopByAiring, useAnimeTopByPopularity } from 'hooks/useJikan'
import { IAnime, TFilter } from 'types/anime'

import { handlePrefetchAnime } from 'utils/http/jikan/jikan-resource'

import { Heading } from './Heading'

interface Props {
  value?: IAnime[]
  type: TFilter
}

function RankingComponent({ value, type }: Props) {
  const useRanking = useCallback(() => {
    if (type === 'bypopularity') {
      return useAnimeTopByPopularity(value)
    }
    return useAnimeTopByAiring(value)
  }, [type, value])

  const { isLoading, isError, data } = useRanking()

  if (isLoading || isError || !data) {
    return null
  }

  return (
    <Box
      w="250px"
      h={type === 'airing' ? '250px' : '500px'}
      bgColor="white"
      border="1px solid black"
      borderRadius="5px"
      position="relative"
    >
      <Heading title={type === 'airing' ? 'Top Airing' : 'Most Popular'} />
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        w="95%"
        mt="50px"
        p="10px"
        mx="auto"
      >
        <OrderedList fontSize="lg">
          <Stack spacing="10px">
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
      </Flex>
    </Box>
  )
}

const Ranking = memo(RankingComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { Ranking }
export type { Props as RankingProps }
