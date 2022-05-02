import { Box, Text } from '@chakra-ui/react'

interface Props {
  value: number | string
}

function Statistics({ value }: Props) {
  return (
    <Box minW="60px" textAlign="center">
      <Text
        fontWeight="bold"
        fontSize="sm"
        color="gray.500"
        textTransform="uppercase"
        bgColor="yellow.500"
        p="2.5px"
        borderRadius="5px"
      >
        {typeof value === 'number' ? 'Score' : 'Similarity'}
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        {value}
      </Text>
    </Box>
  )
}

export { Statistics }
export type { Props as StatisticsProps }
