import { Box, Flex, Link, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import Image from 'next/image'

import { WhatanimeLogo } from '../common'

import { Paypal, Social } from '.'

export function Footer() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: false,
    lg: false,
    xl: true,
  })

  return (
    <Box as="footer" w="full" py="30px" borderTop="1px solid black">
      <Flex w={['95%', '70%']} mx="auto" flexDirection={['column', 'row']}>
        <Box w={['95%', '35%']} mx="auto" mb={['25px', 'none']}>
          {isWideVersion && <WhatanimeLogo />}
          <Social />
        </Box>

        <VStack
          borderLeft={['none', '1px solid black']}
          px="15px"
          alignItems="left"
          spacing="25px"
          width="85%"
        >
          <Flex alignItems="center">
            <Text fontSize="xl" fontWeight="200" color="white" w={['auto', '35%']}>
              This site is our baby, so please consider donating if you are able so that we can keep working
              on it!
            </Text>
            {isWideVersion && <Paypal />}
          </Flex>
          <Text fontSize="2xl" color="white" textTransform="uppercase">
            Legal
          </Text>
          <Text fontSize="xl" fontWeight="200" color="white" w={['100%', '65%']}>
            All anime series names, images, and content are copyrighted content of their respective license
            holders. I do not own the rights to any of these anime series. Anime information compiled from
            AniList and MyAnimeList.
          </Text>
          <Box>
            <Text fontFamily="Nova Mono" fontSize="2xl" mb="-10px" color="white" textTransform="uppercase">
              Designed By
            </Text>
            <Link href="https://www.highlandertech.com.br/" mt="-20px" ml="-5px">
              <Image src="/highlanderLogo.png" alt="HighlanderTech" width={260} height={65} />
            </Link>
          </Box>
        </VStack>
      </Flex>
    </Box>
  )
}
