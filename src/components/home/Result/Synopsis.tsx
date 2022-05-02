import { Heading, Text } from '@chakra-ui/react'

interface Props {
  synopsis: string
}

function Synopsis({ synopsis }: Props) {
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

export { Synopsis }
export type { Props as SynopsisProps }
