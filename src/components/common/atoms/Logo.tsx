import { useWindowSize } from 'react-use'
import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  const { width } = useWindowSize()

  return (
    <Link href="/" passHref>
      <a className="flex flex-row mb-2 gap-3">
        <div className="block w-40 h-40 md:w-20 md:h-20">
          <Image src="/logo.svg" width={80} height={80} layout="responsive" alt="WhatAnime" />
        </div>
        {width >= 768 && (
          <h1 className="w-40 font-mono text-4xl font-normal text-yellow-300 uppercase">What Anime?</h1>
        )}
      </a>
    </Link>
  )
}
