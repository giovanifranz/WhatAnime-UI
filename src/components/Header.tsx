import { Box, Heading, Link } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

import LogoWhatAnime from '../assets/LogoWhatAnime.png'

export default function Header() {
  return (
    <Box minWidth={1050} w="100%" as="header">
      <Box w={1100} h="32" mx="auto" py="6" align="left">
        <NextLink href="/" passHref>
          <Link display="flex" _hover={{ textDecoration: 'none' }}>
            <Image src={LogoWhatAnime} width={80} height={80} alt="Logo WhatAnime" />
            <Heading
              as="h1"
              fontFamily="Nova Mono"
              fontWeight="normal"
              fontSize="45px"
              lineHeight="79%"
              w="152px"
              h="70px"
              color="yellow.500"
              ml="10px"
              textTransform="uppercase"
            >
              What Anime?
            </Heading>
          </Link>
        </NextLink>
      </Box>
    </Box>
  )
}
