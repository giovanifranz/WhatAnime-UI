import { Flex, Heading } from '@chakra-ui/react'

import { ButtonBackTo } from 'components'

export default function NotFound() {
  return (
    <Flex w="80%" h="50vh" mx="auto" alignItems="center" justifyContent="center" direction="column">
      <Heading as="h1" fontSize="3xl" fontWeight="bold" textAlign="center" color="black" mb="25px">
        Page not found:
        <br />
        404
      </Heading>
      <ButtonBackTo to="search" />
    </Flex>
  )
}
