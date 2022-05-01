import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { QuoteProps, Search } from 'components/home'

const Quote = dynamic<QuoteProps>(() => import('components/home/Quote').then((module) => module.Quote))

export default function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: false,
    lg: false,
    xl: true,
  })

  return (
    <Box w="full">
      <Flex w={['95%', '70%']} mx="auto" my="30px" alignItems="center" justifyContent="space-between">
        <Search />
        {isWideVersion && <Quote anime="Naruto" character="Sasuke" quote="I'm the best!" id={1} />}
      </Flex>
    </Box>
  )
}
