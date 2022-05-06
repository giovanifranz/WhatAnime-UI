import Link from 'next/link'

import { handlePrefetchAnime } from 'utils/common/queryClient'

interface Props {
  id: number
}

function Button({ id }: Props) {
  return (
    <button
      className="p-1 text-sm font-bold text-center uppercase bg-yellow-300 border-4 border-yellow-300 border-solid rounded-lg text-zinc-400 transition-colors hover:bg-white hover:text-yellow-300"
      type="button"
    >
      <Link href={`/${id}`}>
        <a onMouseEnter={() => handlePrefetchAnime(id)}>Go to Page</a>
      </Link>
    </button>
  )
}

export { Button }
export type { Props as ButtonProps }
