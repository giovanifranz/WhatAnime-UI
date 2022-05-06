import { lazy, Suspense } from 'react'
import { useWindowSize } from 'react-use'

import { Loading, Logo } from '../atoms'

const Quote = lazy(() => import('../molecules/Quote'))

export function Header() {
  const { width } = useWindowSize()

  return (
    <header>
      <section className="w-full border-b-2 border-black border-solid">
        <div className="flex items-center justify-between w-11/12 max-w-6xl py-5 mx-auto md:w-5/6 xl:w-9/12">
          <Logo />
          <Suspense fallback={<Loading />}>{width < 768 && <Quote />}</Suspense>
        </div>
      </section>
    </header>
  )
}
