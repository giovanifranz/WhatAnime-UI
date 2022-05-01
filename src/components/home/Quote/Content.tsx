import { memo, ReactNode } from 'react'
import { Heading, HStack, Stack, Text } from '@chakra-ui/react'

interface Props {
  title: string
  character: string
  quote: string
  children?: ReactNode
}

function ContentComponent({ children, title, character, quote }: Props) {
  return (
    <>
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
            “{title}”
          </Text>
        </Stack>
        {children}
      </HStack>
    </>
  )
}

const Content = memo(ContentComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { Content }
export type { Props as ContentProps }
