import { memo, useCallback } from 'react'
import { Box, Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { useAnimeByIdOnJikan, useAnimeRandom } from 'hooks/useJikan'
import dynamic from 'next/dynamic'
import { IAnime } from 'types/anime'

import { Button } from './Button'
import { StatisticsProps } from './Statistics'
import { SynopsisProps } from './Synopsis'

const Statistics = dynamic<StatisticsProps>(() => import('./Statistics').then((module) => module.Statistics))
const Synopsis = dynamic<SynopsisProps>(() => import('./Synopsis').then((module) => module.Synopsis))

interface Props {
  anime?: IAnime
  isAnimeToday?: boolean
}

function ResultComponent({ anime, isAnimeToday }: Props) {
  const useAnime = useCallback(() => {
    if (isAnimeToday || !anime) {
      return useAnimeRandom(anime)
    }
    return useAnimeByIdOnJikan(anime, anime.id)
  }, [anime, isAnimeToday])

  const { isLoading, isError, data } = useAnime()

  if (isLoading || isError || !data) {
    return null
  }

  const { title, imageUrl, year, score, similarity, id, episodes, synopsis } = data

  return (
    <Box w={['100%', '65%']}>
      <Flex
        w="100%"
        as="article"
        bgColor="white"
        border="1px solid black"
        borderRadius="5px"
        h="250px"
        position="relative"
      >
        <Image
          src={imageUrl}
          w="165px"
          h="100%"
          display="inherit"
          borderRight="1px solid black"
          borderLeftRadius="5px"
          bgSize="cover"
          alt="Anime Banner"
        />
        <Box w="100%" p="10px">
          <Flex w="100%" alignItems="center" justifyContent="space-between">
            <HStack spacing="20px" w="100%">
              <VStack w="60%" spacing="5px" alignItems="left">
                <HStack spacing="20px">
                  <Heading as="h2" fontWeight="bold" fontSize="xl" isTruncated>
                    {title}
                  </Heading>
                  <Text as="span" fontSize="xl">
                    {year && `(${year})`}
                  </Text>
                </HStack>
                {episodes && <Text fontSize="sm">Episodes: {episodes}</Text>}
              </VStack>
              {score && <Statistics value={score} />}
              {similarity && <Statistics value={similarity} />}
            </HStack>
            <Button id={id} />
          </Flex>
          {synopsis && <Synopsis synopsis={synopsis} />}
        </Box>
      </Flex>
    </Box>
  )
}

const Result = memo(ResultComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { Result }
export type { Props as ResultProps }
