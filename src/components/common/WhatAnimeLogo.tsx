import { Heading, Link } from '@chakra-ui/react'
import Image from 'next/image'

export function WhatAnimeLogo() {
  return (
    <Link href="/" display="flex" _hover={{ textDecoration: 'none' }} alignItems="center">
      <Image src="/whatAnimeLogo.png" width={80} height={80} alt="WhatAnime" />
      <Heading
        as="h1"
        fontFamily="Nova Mono"
        fontSize="45px"
        fontWeight="normal"
        lineHeight="80%"
        w="155px"
        color="yellow.500"
        ml="10px"
        textTransform="uppercase"
      >
        What Anime?
      </Heading>
    </Link>
  )
}
