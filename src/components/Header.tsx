import { lazy, Suspense } from 'react'
import { useWindowSize } from 'hooks/useWindowSize'

import { Loading, Logo } from './common'

const Quote = lazy(() => import('components/home/Quote'))

export function Header() {
  const { width } = useWindowSize()

  return (
    <header className="bg-zinc-400">
      <section className="w-full border-b-2 border-solid border-black">
        <div className="flex max-w-6xl w-11/12 md:w-5/6 xl:w-9/12 mx-auto items-center py-5 justify-between">
          <Logo />
          <Suspense fallback={<Loading />}>{width < 768 && <Quote />}</Suspense>
        </div>
      </section>
    </header>
  )
}
