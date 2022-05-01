import { Heading, Link } from '@chakra-ui/react'
import Image from 'next/image'

interface Props {
  isMobile?: boolean
}

export function WhatAnimeLogo({ isMobile }: Props) {
  return (
    <Link href="/" display="flex" _hover={{ textDecoration: 'none' }} alignItems="center">
      <Image src="/whatAnimeLogo.png" width={100} height={100} alt="WhatAnime" />
      {!isMobile && (
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
      )}
    </Link>
  )
}
