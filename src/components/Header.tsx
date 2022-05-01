import { Box } from '@chakra-ui/react'

import { WhatAnimeLogo } from './common'

export function Header() {
  return (
    <Box w="full" as="header">
      <Box w="70%" mx="auto" py="10px">
        <WhatAnimeLogo />
      </Box>
    </Box>
  )
}
