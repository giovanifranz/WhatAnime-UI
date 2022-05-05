import { memo, useCallback } from 'react'
import { useAnimeByIdOnJikan, useAnimeRandom } from 'hooks/useJikan'
import { useWindowsSize } from 'hooks/useWindowsSize'
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
  const { width } = useWindowsSize()
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
    <section className="w-full h-64 lg:w-2/3 border border-solid border-black bg-white flex justify-between relative rounded">
      {width >= 768 && (
        <div className="w-52 border-r border-solid border-black relative rounded-l">
          <Image src={imageUrl} layout="fill" alt={title} />
        </div>
      )}
      <article className="w-full bg-white p-2 rounded md:rounded-r">
        <div className="flex justify-between">
          <div className="flex gap-1 w-60">
            <div>
              <h2 className="font-bold text-xl line-clamp-1">{title}</h2>
              {episodes && <p className="text-sm">Episodes: {episodes}</p>}
            </div>
            <span className="text-xl">{width > 768 && year && `(${year})`}</span>
          </div>
          <div className="flex gap-3 flex-col-reverse md:flex-row">
            {width < 768 && similarity && <Statistics value={similarity} />}
            {score && <Statistics value={score} />}
            <Button id={id} />
          </div>
        </div>
        {synopsis && (
          <div className="absolute bottom-2 ">
            <h3 className="font-bold text-lg">Synopsis</h3>
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
