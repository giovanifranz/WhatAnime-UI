import { AiFillFacebook, AiOutlineTwitter } from 'react-icons/ai'
import { SiAnilist, SiMyanimelist } from 'react-icons/si'
import { HStack, Stack } from '@chakra-ui/react'

import { Link, Text } from '.'

export function Social() {
  return (
    <Stack as="section" spacing="20px">
      <Text title="Connect" />
      <HStack w="120px" justifyContent="space-between" spacing="10px">
        <Link href="https://anilist.co" icon={SiAnilist} />
        <Link href="https://myanimelist.net/profile/HighlanderTech" icon={SiMyanimelist} />
      </HStack>
      <Text title="Share" />
      <HStack w="120px" justifyContent="space-between" spacing="10px">
        <Link
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A//www.whatanime.org/"
          icon={AiFillFacebook}
        />
        <Link
          href="https://twitter.com/intent/tweet?text=https%3A//www.whatanime.org/"
          icon={AiOutlineTwitter}
        />
      </HStack>
    </Stack>
  )
}
