import { useWindowsSize } from 'hooks/useWindowsSize'
import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  const { width } = useWindowsSize()

  return (
    <Link href="/" passHref>
      <a className="flex flex-row gap-3 mb-2">
        <div className="relative lg:w-20 lg:h-20 w-44 h-44">
          <Image src="/logo.svg" layout="fill" alt="WhatAnime" />
        </div>
        {width > 768 && (
          <h1 className="font-mono text-4xl text-yellow-300 font-normal w-40 uppercase">What Anime?</h1>
        )}
      </a>
    </Link>
  )
}
