import { memo } from 'react'
import { useAnimeTop } from 'hooks/useJikan'
import Link from 'next/link'

import { handlePrefetchAnime } from 'utils/common/queryClient'

import { Heading } from './Heading'

interface Props {
  type: TFilter
  isPopular?: boolean
}

function RankingComponent({ type, isPopular = false }: Props) {
  const { isLoading, isError, data } = useAnimeTop(type)

  if (isLoading || isError || !data) {
    return null
  }

  return (
    <section
      className={`relative w-64 bg-white border border-black border-solid rounded ${
        isPopular && 'h-[500px]'
      }`}
    >
      <Heading title={type === 'airing' ? 'Top Airing' : 'Most Popular'} />
      <article className="relative flex-col w-11/12  mx-auto mt-12 p-[10px]">
        <ol className={`absolute flex flex-col ml-3 list-decimal gap-${isPopular ? '5' : '4'}`}>
          {data.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/${id}`} passHref>
                <a
                  className="line-clamp-1 transition hover:underline"
                  onMouseEnter={() => handlePrefetchAnime(id)}
                >
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
