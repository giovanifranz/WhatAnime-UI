import { useWindowsSize } from 'hooks/useWindowsSize'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import { Social } from './Social'

const Logo = dynamic<EmptyObject>(() => import('../common/Logo').then((module) => module.Logo))

const Paypal = dynamic<EmptyObject>(() => import('./Paypal').then((module) => module.Paypal))

export function Footer() {
  const { width } = useWindowsSize()

  return (
    <footer className="w-full text-zinc-100 bg-zinc-400 border-t-2 border-solid border-black py-5 ">
      <section className="flex flex-col w-11/12 max-w-6xl items-center justify-between mx-auto xl:w-9/12 xl:flex-row">
        <div className="mx-auto flex flex-row xl:flex-col justify-center items-center xl:gap-5xl xl:mx-0 xl:h-72 xl:items-start xl:-mt-32">
          {width >= 1024 && <Logo />}
          <Social />
        </div>
        <article className="flex flex-col px-4 items-start gap-6 xl:w-4/6 xl:border-l xl:border-solid xl:border-black">
          <div className="flex items-center gap-4">
            <p className="font-extralight text-xl xl:w-1/3">
              This site is our baby, so please consider donating if you are able so that we can keep working
              on it!
            </p>
            {width >= 1280 && <Paypal />}
          </div>
          <p className="text-2xl uppercase">Legal</p>
          <p className="font-extralight text-xl w-full xl:w-2/3">
            All anime series names, images, and content are copyrighted content of their respective license
            holders. I do not own the rights to any of these anime series. Anime information compiled from
            AniList and MyAnimeList.
          </p>
          <div>
            <p className="font-mono text-2xl -mb-2 uppercase w-full xl:w-2/3">Designed By</p>
            <Link href="https://www.highlandertech.com.br/">
              <a>
                <div className=" relative w-64 h-16 -ml-1">
                  <Image src="/highlanderLogo.png" alt="HighlanderTech" layout="fill" />
                </div>
              </a>
            </Link>
          </div>
        </article>
      </section>
    </footer>
  )
}
