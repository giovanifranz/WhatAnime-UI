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
      className="max-w-xs py-3 mx-auto text-base font-bold text-center uppercase bg-yellow-300 border-4 border-transparent border-solid text-zinc-400 rounded-xl px-11 transition-colors hover:text-yellow-300 hover:border-yellow-300 hover:bg-white"
      onClick={() => handleClick()}
    >
      {text[to]}
    </button>
  )
}

const ButtonBackTo = memo(ButtonBackToComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { ButtonBackTo }
export type { Props as ButtonBackToProps }
