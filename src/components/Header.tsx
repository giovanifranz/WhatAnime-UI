import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { WhatAnimeLogo } from './common'
import { QuoteProps } from './home'

const Quote = dynamic<QuoteProps>(() => import('components/home/Quote').then((module) => module.Quote))

export function Header() {
  const isMobileVersion = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
    xl: false,
  })

  return (
    <Box w="full" as="header">
      <Flex w={['95%', '70%']} mx="auto" py="20px" justifyContent="space-between">
        <WhatAnimeLogo isMobile={isMobileVersion} />
        {isMobileVersion && <Quote isMobile />}
      </Flex>
    </Box>
  )
}
