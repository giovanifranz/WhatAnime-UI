import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'

import { WhatanimeLogo } from '../common'

import { Paypal, Social } from '.'

export function Footer() {
  return (
    <Box as="footer" w="full" py="30px" borderTop="1px solid black">
      <Flex w="70%" mx="auto" alignItems="center">
        <Box w="35%">
          <WhatanimeLogo />
          <Social />
        </Box>
        <VStack borderLeft="1px solid black" px="15px" alignItems="left" spacing="20px">
          <Flex alignItems="center">
            <Text fontSize="xl" fontWeight="200" color="white" w="368px">
              This site is our baby, so please consider donating if you are able so that we can keep working
              on it!
            </Text>
            <Paypal />
          </Flex>
          <Text fontSize="2xl" color="white" textTransform="uppercase">
            Legal
          </Text>
          <Text fontSize="xl" fontWeight="200" color="white" w="65%">
            All anime series names, images, and content are copyrighted content of their respective license
            holders. I do not own the rights to any of these anime series. Anime information compiled from
            AniList and MyAnimeList.
          </Text>
          <Text fontFamily="Nova Mono" fontSize="2xl" mb="-10px" color="white" textTransform="uppercase">
            Designed By
          </Text>
          <Link href="https://www.highlandertech.com.br/">
            <Image src="/highlanderLogo.png" alt="HighlanderTech" width={260} height={65} />
          </Link>
        </VStack>
      </Flex>
    </Box>
  )
}
