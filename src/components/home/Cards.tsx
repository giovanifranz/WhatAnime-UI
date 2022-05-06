import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { handlePrefetchAnime } from 'utils/common/queryClient'

interface Props {
  id: number
  title: string
  imageUrl: string
}

function CardComponent({ id, imageUrl, title }: Props) {
  return (
    <Link href={`/${id}`} passHref>
      <a type="button" className="relative w-40 h-56 rounded transition-opacity hover:opacity-80">
        <Image src={imageUrl} alt={title} layout="fill" className="rounded" />

        <p
          onMouseEnter={() => handlePrefetchAnime(id)}
          className="absolute bottom-0 w-full px-2 text-base text-center bg-yellow-300 border rounded text-zinc-400 line-clamp-1"
        >
          {title}
        </p>
      </a>
    </Link>
  )
}

const Card = memo(CardComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export default Card
