import { Flex, Heading } from '@chakra-ui/react'

import BackToSearch from './BackToSearch'
export default function NotFound() {
  return (
    <Flex w="1105px" minH={900} mx="auto" alignItems="center" justifyContent="center" direction="column">
      <Heading
        as="h1"
        fontSize="2.25rem"
        fontWeight="bold"
        lineHeight="2.5rem"
        fontStyle="normal"
        color="black"
        mb="25px"
      >
        Anime not found: 404
      </Heading>
      <BackToSearch />
    </Flex>
  )
}
