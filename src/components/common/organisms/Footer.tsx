import { useWindowSize } from 'react-use'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import { Social } from '../molecules'

const Logo = dynamic<EmptyObject>(() => import('../atoms/Logo').then((module) => module.Logo))
const Paypal = dynamic(() => import('../atoms/Paypal'))

export function Footer() {
  const { width } = useWindowSize()

  return (
    <footer className="w-full py-5 border-t-2 border-black border-solid text-zinc-100">
      <section className="flex flex-col items-center justify-between w-11/12 max-w-6xl mx-auto xl:w-9/12 xl:flex-row">
        <div className="flex flex-row items-center justify-center mx-auto xl:flex-col xl:gap-5xl xl:mx-0 xl:h-72 xl:items-start xl:-mt-32">
          {width >= 1024 && <Logo />}
          <Social />
        </div>
        <article className="flex flex-col items-start px-4 gap-6 xl:w-4/6 xl:border-l xl:border-solid xl:border-black">
          <div className="flex items-center gap-4">
            <p className="text-xl font-extralight xl:w-1/3">
              This site is our baby, so please consider donating if you are able so that we can keep working
              on it!
            </p>
            {width >= 1280 && <Paypal />}
          </div>
          <p className="text-2xl uppercase">Legal</p>
          <p className="w-full text-xl font-extralight xl:w-2/3">
            All anime series names, images, and content are copyrighted content of their respective license
            holders. I do not own the rights to any of these anime series. Anime information compiled from
            AniList and MyAnimeList.
          </p>
          <div>
            <p className="w-full -mb-2 font-mono text-2xl uppercase xl:w-2/3">Designed By</p>
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
