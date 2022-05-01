import { Box, Flex } from '@chakra-ui/react'

import { Search } from 'components/home'

export default function Home() {
  return (
    <Box w="full">
      <Flex w="70%" mx="auto" my="30px" alignItems="center" justifyContent="space-between">
        <Search />
      </Flex>
    </Box>
  )
}
