import { lazy, memo, Suspense } from 'react'
import { useAnimeByIdOnJikan, useSelect } from 'hooks'
import { IAnime } from 'types'

import { ButtonBackToComponent, Loading } from 'components/common/atoms'
import Head from 'components/common/atoms/Head'

import { Title } from './atoms/Title'
import { Search } from './organisms/Search'
import { useWindowSize } from 'react-use'

const Quote = lazy(() => import('components/common/molecules/Quote'))
const Result = lazy(() => import('./molecules/Result'))
const Ranking = lazy(() => import('./molecules/Ranking'))
const Card = lazy(() => import('./molecules/Card'))

interface Props {
  id: number
}

function Template({ id }: Props) {
  const { results } = useSelect()
  const { width } = useWindowSize()
  const { data: randomResult } = useAnimeByIdOnJikan(id)

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

const HomeTemplate = memo(Template, (prevProps, nextProps) => Object.is(prevProps, nextProps))
export { HomeTemplate }
