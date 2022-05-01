import { Box, Flex, Heading, Stack } from '@chakra-ui/react'

import List from './List'

export interface RelatedAnimeProps {
  related: {
    Other?: {
      mal_id: number
      name: string
    }[]
    'Alternative version'?: {
      mal_id: number
      name: string
    }[]
    'Side story'?: {
      mal_id: number
      name: string
    }[]
  }
}

export default function RelatedAnime({ related }: RelatedAnimeProps) {
  return (
    <Box as="section">
      <Heading as="h2" fontWeight="bold" fontSize="1.375rem" lineHeight="1.625rem" color="black" mt="30px">
        Related Anime
        <Box bgColor="gray.500" w="210px" h="1px" />
      </Heading>
      <Flex
        mt="20px"
        fontSize="1.25rem"
        fontWeight="normal"
        lineHeight="1.5rem"
        fontStyle="normal"
        spacing="20px"
        ml="20px"
        direction="column"
      >
        {related['Side story'] && <List title="Side story" related={related['Side story']} />}
        {related['Alternative version'] && (
          <List title="Alternative version" related={related['Alternative version']} />
        )}
        {related.Other && <List title="Other" related={related.Other} />}
      </Flex>
    </Box>
  )
}