import { Box, Flex, Heading as ChakraHeading, Text } from '@chakra-ui/react'

export interface HeadingProps {
  episodes: number
  title: string
  year: number
  score: number
}

export default function Heading({ episodes, title, year, score }: HeadingProps) {
  return (
    <Flex w="885px" justifyContent="space-between" as="section">
      <Box>
        <Flex>
          <ChakraHeading
            as="h1"
            fontSize="1.875rem"
            fontWeight="bold"
            lineHeight="1.9rem"
            fontStyle="normal"
            color="black"
            maxW="442.5px"
          >
            {title}
          </ChakraHeading>

          <Text fontSize="1.875rem" fontWeight="normal" lineHeight="1.9rem" color="black" ml="15px">
            ({year})
          </Text>
        </Flex>
        <Text
          fontWeight="normal"
          fontStyle="normal"
          fontSize="1.375rem"
          lineHeight="1.40rem"
          color="black"
          mt="10px"
        >
          Episodes: {episodes}
        </Text>
      </Box>
      <Box w="65px" textAlign="center">
        <Text
          bgColor="yellow.500"
          color="gray.500"
          h="30px"
          textTransform="uppercase"
          fontSize="1.125rem"
          fontWeight="bold"
          fontStyle="normal"
          lineHeight="1.25"
          borderRadius="5px"
          pt="5px"
        >
          Score
        </Text>
        <Text fontWeight="bold" fontSize="1.75rem" lineHeight="1.85rem">
          {score}
        </Text>
      </Box>
    </Flex>
  )
}
