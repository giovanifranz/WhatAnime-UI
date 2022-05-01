import { memo } from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { ButtonProps } from '.'

interface Props {
  title: string
  character: string
  quote: string
  id?: number
}

const Button = dynamic<ButtonProps>(() => import('./Button').then((module) => module.Button))

function ContentComponent({ title, character, quote, id }: Props) {
  return (
    <Box position="relative">
      <Text w="100%" fontStyle="italic" fontWeight={300} fontSize="lg" noOfLines={3}>
        “{quote}”
      </Text>
      <Box as="div">
        <Flex direction="column" mt="8px" h="50px" w={['70%', '75%']} justifyContent="space-between">
          <Heading as="h4" fontWeight="bold" fontSize="lg" isTruncated>
            “{character}”
          </Heading>
          <Text fontSize="lg" isTruncated>
            “{title}”
          </Text>
        </Flex>
        <Box position="absolute" bottom={0} right={0}>
          {id && <Button id={id} />}
        </Box>
      </Box>
    </Box>
  )
}

const Content = memo(ContentComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { Content }
export type { Props as ContentProps }
