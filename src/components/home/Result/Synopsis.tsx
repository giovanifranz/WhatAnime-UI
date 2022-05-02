import { memo } from 'react'
import { Heading, Text } from '@chakra-ui/react'

interface Props {
  synopsis: string
}

function SynopsisComponent({ synopsis }: Props) {
  return (
    <>
      <Heading as="h3" fontWeight="bold" mt="25px" fontSize="lg">
        Synopsis
      </Heading>
      <Text fontSize="md" w="80%" noOfLines={4} h="95px">
        {synopsis}
      </Text>
    </>
  )
}

const Synopsis = memo(SynopsisComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { Synopsis }
export type { Props as SynopsisProps }
