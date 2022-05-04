import { HiArrowRight } from 'react-icons/hi'
import Link from 'next/link'

import { handlePrefetchAnime } from 'utils/common/queryClient'

export interface Props {
  id: number
}

function Button({ id }: Props) {
  return (
    <button
      className="h-9 m-2 justify-center bg-slate-100 rounded-md transition-colors hover:bg-zinc-400 "
      type="button"
    >
      <Link href={`/${id}`} passHref>
        <a className="text-zinc-800 hover:text-yellow-400" onMouseEnter={() => handlePrefetchAnime(id)}>
          <HiArrowRight size="36px" />
        </a>
      </Link>
    </button>
  )
}

export { Button }
export type { Props as ButtonProps }
