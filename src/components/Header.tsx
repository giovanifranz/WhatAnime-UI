import { Box } from '@chakra-ui/react'

import { WhatanimeLogo } from './common'

export function Header() {
  return (
    <Box w="full" as="header">
      <Box w="70%" mx="auto" py="10px">
        <WhatanimeLogo />
      </Box>
    </Box>
  )
}
