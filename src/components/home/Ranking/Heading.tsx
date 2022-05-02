import { Box, Heading } from '@chakra-ui/react'

interface HeadingRankingProps {
  title: string
}

export default function HeadingRanking({ title }: HeadingRankingProps) {
  return (
    <Box bgColor="yellow.500" w="250px" h="50px" ml="-1px" mt="-1px" border="1px solid black">
      <Heading
        textAlign="center"
        color="gray.500"
        fontWeight="bold"
        fontSize="2xl"
        textTransform="uppercase"
        mt="8px"
      >
        {title}
      </Heading>
    </Box>
  )
}