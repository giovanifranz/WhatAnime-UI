import { useWindowsSize } from 'hooks/useWindowsSize'
import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  const { width } = useWindowsSize()

  return (
    <Link href="/" passHref>
      <a className="flex flex-row gap-3 align-middle h-min">
        <Image
          src="/logo.svg"
          width={width < 768 ? 110 : 80}
          height={width < 768 ? 110 : 80}
          alt="WhatAnime"
        />
        {width > 768 && (
          <h1 className="font-mono text-4xl text-yellow-300 font-normal w-40 uppercase">What Anime?</h1>
        )}
      </a>
    </Link>
  )
}
