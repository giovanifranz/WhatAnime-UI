import { memo, useCallback } from 'react'
import { useWindowSize } from 'react-use'
import { useAnimeByIdOnJikan, useAnimeRandom } from 'hooks/useJikan'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { IAnime } from 'types/anime'

import { Button } from './Button'
import { StatisticsProps } from './Statistics'

const Statistics = dynamic<StatisticsProps>(() => import('./Statistics').then((module) => module.Statistics))

interface Props {
  anime?: IAnime
  isRandom?: boolean
}

function ResultComponent({ anime, isRandom }: Props) {
  const { width } = useWindowSize()
  const useAnime = useCallback(() => {
    if (isRandom || !anime) {
      return useAnimeRandom()
    }
    return useAnimeByIdOnJikan(anime, anime.id)
  }, [anime, isRandom])

  const { isLoading, isError, data } = useAnime()

  if (isLoading || isError || !data) {
    return null
  }

  const { title, imageUrl, year, score, similarity, id, episodes, synopsis } = data

  return (
    <section className="relative flex justify-between w-full h-64 bg-white border border-black border-solid rounded lg:w-2/3">
      {width >= 768 && (
        <div className="relative border-r border-black border-solid rounded-l w-52">
          <Image src={imageUrl} layout="fill" alt={title} />
        </div>
      )}
      <article className="w-full p-2 bg-white rounded md:rounded-r">
        <div className="flex justify-between">
          <div className="flex gap-1 w-60">
            <div>
              <h2 className="text-xl font-bold line-clamp-1">{title}</h2>
              {episodes && <p className="text-sm">Episodes: {episodes}</p>}
            </div>
            <span className="text-xl">{width > 768 && year && `(${year})`}</span>
          </div>
          <div className="flex flex-col-reverse gap-3 md:flex-row">
            {width < 768 && similarity && <Statistics value={similarity} />}
            {score && <Statistics value={score} />}
            <Button id={id} />
          </div>
        </div>
        {synopsis && (
          <div className="absolute bottom-2 ">
            <h3 className="text-lg font-bold">Synopsis</h3>
            <p className="w-11/12 text-lg line-clamp-4">{synopsis}</p>
          </div>
        )}
      </article>
    </section>
  )
}

const Result = memo(ResultComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export default Result
export type { Props as ResultProps }
