import { AiFillFacebook, AiOutlineTwitter } from 'react-icons/ai'
import { SiAnilist, SiMyanimelist } from 'react-icons/si'
import { useWindowSize } from 'hooks/useWindowSize'

import { Link } from './Link'
import { Text } from './Text'

export function Social() {
  const { width } = useWindowSize()

  return (
    <div className="flex flex-col mb-6">
      <div className=" mb-3">
        <Text title="Connect" />
      </div>
      <div className="flex gap-3 md:flex-col">
        <div className="flex gap-4">
          <Link href="https://anilist.co">
            <SiAnilist size="52px" />
          </Link>
          <Link href="https://myanimelist.net/profile/HighlanderTech">
            <SiMyanimelist size="52px" />
          </Link>
        </div>
        {width > 768 && <Text title="Share" />}
        <div className="flex gap-4">
          <Link href="https://www.facebook.com/sharer/sharer.php?u=https%3A//www.whatanime.org/">
            <AiFillFacebook size="52px" />
          </Link>
          <Link href="https://twitter.com/intent/tweet?text=https%3A//www.whatanime.org/">
            <AiOutlineTwitter size="52px" />
          </Link>
        </div>
      </div>
    </div>
  )
}
