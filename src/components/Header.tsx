import { useWindowsSize } from 'hooks/useWindowsSize'
import dynamic from 'next/dynamic'

import { Logo } from './common'
import { QuoteProps } from './home'

const Quote = dynamic<QuoteProps>(() => import('components/home/Quote').then((module) => module.Quote))

export function Header() {
  const { width } = useWindowsSize()

  return (
    <header className="bg-zinc-400">
      <section className="w-full border-b-2 border-solid border-black">
        <div className="flex max-w-6xl w-11/12 md:w-5/6 xl:w-9/12 mx-auto items-center py-5 justify-between">
          <Logo />
          {width < 768 && <Quote />}
        </div>
      </section>
    </header>
  )
}
