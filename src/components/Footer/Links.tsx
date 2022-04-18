import { ReactNode } from 'react'
import { AiFillFacebook, AiOutlineTwitter } from 'react-icons/ai'
import { SiAnilist, SiMyanimelist } from 'react-icons/si'
import { HStack, Link as LinkChakra, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

interface HeadingProps {
  title: string
}

interface LinkProps {
  children: ReactNode
  href: string
}

function Link({ children, href }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <LinkChakra
        borderRadius="8px"
        bgColor="gray.100"
        color="gray.500"
        p="5px"
        _hover={{
          bgColor: 'yellow.500',
          color: 'gray.800',
        }}
      >
        {children}
      </LinkChakra>
    </NextLink>
  )
}

function Heading({ title }: HeadingProps) {
  return (
    <Text
      mt={['10px', '10px', '20px']}
      fontFamily="Nova Mono"
      fontSize="20px"
      color="white"
      textTransform="uppercase"
    >
      {title}
    </Text>
  )
}

export default function Links() {
  return (
    <Stack as="section" spacing="20px">
      <Heading title="Connect" />
      <HStack w="110px" justifyContent="space-between" spacing="20px">
        <Link href="https://anilist.co">
          <SiAnilist size="50px" />
        </Link>
        <Link href="https://myanimelist.net/profile/HighlanderTech">
          <SiMyanimelist size="50px" />
        </Link>
      </HStack>
      <Heading title="Share" />
      <HStack w="110px" justifyContent="space-between" spacing="20px">
        <Link href="https://www.facebook.com/sharer/sharer.php?u=https%3A//www.whatanime.org/">
          <AiFillFacebook size="50px" />
        </Link>
        <Link href="https://twitter.com/intent/tweet?text=https%3A//www.whatanime.org/">
          <AiOutlineTwitter size="50px" />
        </Link>
      </HStack>
    </Stack>
  )
}
