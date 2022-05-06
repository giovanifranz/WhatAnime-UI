import { HiArrowRight } from 'react-icons/hi'
import Link from 'next/link'

import { handlePrefetchAnime } from 'utils/common/queryClient'

export interface Props {
  id: number
}

function Button({ id }: Props) {
  return (
    <button
      className="justify-center m-2 h-9 bg-slate-100 rounded-md transition-colors hover:bg-zinc-400"
      type="button"
    >
      <Link href={`/anime/${id}`} passHref>
        <a className="text-neutral-800 hover:text-yellow-300" onMouseEnter={() => handlePrefetchAnime(id)}>
          <HiArrowRight size="36px" />
        </a>
      </Link>
    </button>
  )
}

export { Button }
export type { Props as ButtonProps }
