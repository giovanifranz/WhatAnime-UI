import { Suspense } from 'react'
import { useWindowSize } from 'react-use'
import { useAnimeRandom, useSelect } from 'hooks'
import dynamic from 'next/dynamic'
import { IAnime } from 'types'

import { ButtonBackToComponent, Loading } from 'components/common/atoms'
import Head from 'components/common/atoms/Head'

import { Title } from './atoms/Title'
import { Search } from './organisms/Search'

const Quote = dynamic(() => import('components/common/molecules/Quote'), { suspense: true })
const Result = dynamic(() => import('./molecules/Result'), { suspense: true })
const Ranking = dynamic(() => import('./molecules/Ranking'), { suspense: true })
const Card = dynamic(() => import('./molecules/Card'), { suspense: true })

interface Props {
  anime?: IAnime
}

export function HomeTemplate({ anime }: Props) {
  const { results } = useSelect()
  const { width } = useWindowSize()
  const { data: randomResult } = useAnimeRandom(anime)

  return (
    <>
      {randomResult && <Head title={randomResult.title} />}
      <main className="flex flex-col pt-5 pb-10 gap-5">
        <div className="flex justify-between w-11/12 max-w-6xl mx-auto gap-14 xl:w-9/12">
          <Search />
          <Suspense fallback={<Loading />}>{width >= 1024 && <Quote />}</Suspense>
        </div>
        <div className="w-11/12 max-w-6xl mx-auto xl:w-9/12">
          <Title text="Anime of the day" />
          <div className="flex justify-between gap-14">
            <div className="w-full lg:w-2/3">
              <Suspense fallback={<Loading />}>{randomResult && <Result anime={randomResult} />}</Suspense>
            </div>
            <Suspense fallback={<Loading />}>{width >= 1024 && <Ranking type="airing" />}</Suspense>
          </div>
        </div>
        <div className="w-11/12 max-w-6xl mx-auto xl:w-9/12">
          {results ? <Title text="Results" /> : <div className="h-9" />}
          <div className="flex justify-between gap-14">
            <div className="flex flex-col w-full lg:w-2/3 gap-5">
              {results ? (
                <>
                  <Result anime={results[0]} />
                  <div className="flex flex-wrap justify-between w-full gap-5">
                    {results.slice(1, 5).map(({ id: resultId, title, imageUrl }) => (
                      <Card key={resultId} id={resultId} imageUrl={imageUrl} title={title} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full lg:w-2/3" />
              )}
            </div>
            <Suspense fallback={<Loading />}>
              {width >= 1024 && <Ranking type="bypopularity" isPopular />}
            </Suspense>
          </div>
        </div>
        <div className="flex flex-col items-center mx-auto lg:max-w-6xl lg:w-11/12 lg:pr-96">
          <ButtonBackToComponent to="top" />
        </div>
      </main>
    </>
  )
}
