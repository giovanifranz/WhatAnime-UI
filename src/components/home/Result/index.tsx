import { useCallback } from 'react'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useAnimeByIdOnJikan, useAnimeRandom } from 'hooks/useJikan'
import { IAnime } from 'types/anime'

import { Button } from '.'

interface Props {
  anime?: IAnime
  isAnimeToday?: boolean
}

export function Result({ anime, isAnimeToday }: Props) {
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
    <Flex as="article" w="790px" h="220px" bgColor="white" border="1px solid black" borderRadius="5px">
      <Image
        src={imageUrl}
        w="161px"
        h="220.1px"
        border="1px solid black"
        borderLeftRadius="5px"
        bgSize="cover"
        ml="-1px"
        mt="-1.1px"
        alt="Anime Banner"
      />
      <Box ml="10px" mt="10px">
        <Flex justifyContent="space-between">
          <Flex>
            <Heading
              as="h3"
              fontStyle="normal"
              fontWeight="bold"
              fontSize="1.25rem"
              lineHeight="1.5rem"
              color="black"
              maxW="225px"
              isTruncated
            >
              {title}
            </Heading>
            <Heading
              as="h3"
              fontStyle="normal"
              fontWeight="normal"
              fontSize="20px"
              lineHeight="24px"
              color="black"
              ml="12px"
            >
              {year && `(${year})`}
            </Heading>
            <Box w="45px" h="45px" ml="12px">
              <Heading
                as="h4"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="12px"
                lineHeight="14px"
                color="gray.500"
                textTransform="uppercase"
                bgColor="yellow.500"
                w="45px"
                h="20px"
                py="2.5px"
                textAlign="center"
                borderRadius="4px"
                mt="2px"
              >
                Score
              </Heading>
              <Text
                textAlign="center"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="1.25rem"
                lineHeight="1.5rem"
                color="black"
              >
                {score}
              </Text>
            </Box>
            {similarity ? (
              <Box w="45px" h="45px" ml="12px">
                <Heading
                  as="h4"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize="12px"
                  lineHeight="14px"
                  color="gray.500"
                  textTransform="uppercase"
                  bgColor="yellow.500"
                  w="80px"
                  h="20px"
                  py="2.5px"
                  textAlign="center"
                  borderRadius="4px"
                  mt="2px"
                >
                  Similarity
                </Heading>
                <Text
                  w="80px"
                  pl="3px"
                  textAlign="center"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize="1.25rem"
                  lineHeight="1.5rem"
                  color="black"
                >
                  {similarity}
                </Text>
              </Box>
            ) : null}
          </Flex>
          <Button id={id} />
        </Flex>
        <Text
          fontStyle="normal"
          fontWeight="normal"
          fontSize="16px"
          lineHeight="19px"
          color="black"
          mt="-15px"
        >
          Episodes: {episodes}
        </Text>
        <Heading
          as="h4"
          fontStyle="normal"
          fontWeight="bold"
          fontSize="16px"
          lineHeight="20px"
          color="black"
          mt="20px"
        >
          Synopsis
        </Heading>

        <Text
          fontStyle="normal"
          fontWeight="normal"
          fontSize="16px"
          lineHeight="19px"
          color="black"
          w="610px"
          h="93px"
          mt="5px"
          noOfLines={5}
        >
          {synopsis}
        </Text>
      </Box>
    </Flex>
  )
}
