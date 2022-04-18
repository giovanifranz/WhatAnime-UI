import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { ButtonQuoteProps } from './Button'
const Button = dynamic<ButtonQuoteProps>(() => import('./Button'))

export interface QuoteProps {
  anime: string
  character: string
  quote: string
  id: number
}

export default function Quote({ anime, character, quote, id }: QuoteProps) {
  return (
    <Stack as="section" h="120px" w="250px" bgColor="yellow.500" borderRadius="5px" p="10px">
      <Text
        fontStyle="italic"
        fontWeight={300}
        fontSize="18px"
        lineHeight="21px"
        w="225px"
        noOfLines={3}
        color="black"
      >
        “{quote}”
      </Text>
      <HStack as="div">
        <Stack h="50px" w="182px" justifyContent="space-between">
          <Heading
            as="h4"
            fontWeight="bold"
            fontStyle="normal"
            fontSize="18px"
            lineHeight="21px"
            color="black"
            mt="8px"
            isTruncated
          >
            “{character}”
          </Heading>
          <Text fontStyle="normal" fontWeight="normal" fontSize="18px" lineHeight="21px" isTruncated>
            “{anime}”
          </Text>
        </Stack>
        {id > 0 && <Button id={id} />}
      </HStack>
    </Stack>
  )
}
