import { AiFillFacebook, AiOutlineTwitter } from 'react-icons/ai'
import { SiAnilist, SiMyanimelist } from 'react-icons/si'
import { HStack, Stack, useBreakpointValue } from '@chakra-ui/react'

import { Link } from './Link'
import { Text } from './Text'

function Share() {
  return (
    <>
      <Link
        href="https://www.facebook.com/sharer/sharer.php?u=https%3A//www.whatanime.org/"
        icon={AiFillFacebook}
      />
      <Link
        href="https://twitter.com/intent/tweet?text=https%3A//www.whatanime.org/"
        icon={AiOutlineTwitter}
      />
    </>
  )
}

export function Social() {
  const isMobileVersion = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
    xl: false,
  })

  return (
    <Stack as="section" spacing="20px">
      <Text title="Connect" />
      <HStack w={['270px', '120px']} justifyContent="space-between" spacing="10px">
        <Link href="https://anilist.co" icon={SiAnilist} />
        <Link href="https://myanimelist.net/profile/HighlanderTech" icon={SiMyanimelist} />
        {isMobileVersion && <Share />}
      </HStack>
      {!isMobileVersion && (
        <>
          <Text title="Share" />
          <HStack w="120px" justifyContent="space-between" spacing="10px">
            <Share />
          </HStack>
        </>
      )}
    </Stack>
  )
}
