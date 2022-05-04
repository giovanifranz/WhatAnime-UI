import Link from 'next/link'

import { handlePrefetchAnime } from 'utils/common/queryClient'

interface Props {
  id: number
}

function Button({ id }: Props) {
  return (
    <button
      className="text-center uppercase font-bold text-zinc-400 bg-yellow-300 rounded-lg py-2 w-40 transition-colors border-4 border-yellow-300 border-solid hover:bg-white hover:text-yellow-300"
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
