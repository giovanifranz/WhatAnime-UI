import { Box, Flex } from '@chakra-ui/react'

import { Quote, Search } from 'components/home'

export default function Home() {
  return (
    <Box w="full">
      <Flex w="70%" mx="auto" my="30px" alignItems="center" justifyContent="space-between">
        <Search />
        <Quote anime="Naruto" character="Sasuke" quote="I'm the best!" id={1} />
      </Flex>
    </Box>
  )
}
