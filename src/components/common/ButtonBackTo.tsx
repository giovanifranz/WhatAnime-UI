import { memo } from 'react'
import { useRouter } from 'next/router'

interface Props {
  to: 'top' | 'search'
}

export function ButtonBackToComponent({ to = 'top' }: Props) {
  const router = useRouter()

  const text = {
    top: 'Back to Top',
    search: 'Back to Search',
  }

  function handleClick() {
    if (to === 'search') router.push('/')
    else globalThis.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className="text-center text-zinc-400 text-base uppercase font-bold border-transparent border-solid bg-yellow-300 rounded-xl py-3 px-11 transition-colors hover:text-yellow-300 hover:border-yellow-300 hover:bg-white border-4"
      onClick={() => handleClick()}
    >
      {text[to]}
    </button>
  )
}

const ButtonBackTo = memo(ButtonBackToComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { ButtonBackTo }
export type { Props as ButtonBackToProps }
