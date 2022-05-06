import { memo } from 'react'
import { useAnimeTop } from 'hooks/useJikan'
import Link from 'next/link'

import { handlePrefetchAnime } from 'utils/common/queryClient'

import { Heading } from './Heading'

interface Props {
  type: TFilter
}

function RankingComponent({ type }: Props) {
  const { isLoading, isError, data } = useAnimeTop(type)

  if (isLoading || isError || !data) {
    return null
  }

  return (
    <section className="relative w-64 bg-white border border-black border-solid rounded">
      <Heading title={type === 'airing' ? 'Top Airing' : 'Most Popular'} />
      <article className="flex-col items-center justify-center w-11/12 p-2 px-4 mx-auto mt-12">
        <ol className="flex flex-col ml-3 text-lg list-decimal gap-3 items-left">
          {data.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/${id}`} passHref>
                <a className="line-clamp-1 hover:underline" onMouseEnter={() => handlePrefetchAnime(id)}>
                  {title}
                </a>
              </Link>
            </li>
          ))}
        </ol>
      </article>
    </section>
  )
}

const Ranking = memo(RankingComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export default Ranking
export type { Props as RankingProps }
