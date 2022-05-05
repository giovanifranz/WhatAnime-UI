import { memo } from 'react'
import { useAnimeTop } from 'hooks/useJikan'
import Link from 'next/link'
import { TFilter } from 'types'

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
    <section className="bg-white w-64 border rounded border-black border-solid relative">
      <Heading title={type === 'airing' ? 'Top Airing' : 'Most Popular'} />
      <article className="w-11/12 mx-auto p-2 items-center justify-center flex-col mt-12 px-4">
        <ol className="flex flex-col text-lg gap-3 list-decimal items-left ml-3">
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
