import { lazy, useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { useAnimeByIdOnJikan } from 'hooks'
import { useRouter } from 'next/router'

import { ButtonBackTo } from 'components'
import { Heading, Synopsis } from 'components/anime'

const Image = lazy(() => import('next/image'))
const Head = lazy(() => import('next/head'))
const Aside = lazy(() => import('components/anime/Aside'))
const Information = lazy(() => import('components/anime/Information'))

export default function AnimePage() {
  const router = useRouter()
  const { width } = useWindowSize()
  const { id } = router.query
  const [animeId, setAnimeId] = useState(0)

  useEffect(() => {
    if (id !== undefined) {
      const numberId = parseInt(id as string, 10)

      if (Number.isNaN(numberId)) {
        router.push('/404')
      }

      setAnimeId(numberId)
    }
  }, [id])

  const { isLoading, isError, data } = useAnimeByIdOnJikan(animeId, undefined)

  if (isLoading || !data) {
    return null
  }

  if (isError) router.push('/404')

  return (
    <>
      {data && (
        <Head>
          <title>WhatAnime | {data.title}</title>
        </Head>
      )}
      <main className="flex flex-col">
        <div className="flex justify-between w-11/12 max-w-6xl mx-auto gap-14 xl:w-9/12">
          {width > 1024 && <Aside anime={data} />}
          <div className="flex flex-col justify-between pt-5 pb-10 gap-14 lg:w-4/5">
            <div className="flex flex-col gap-3">
              {width < 768 && (
                <div className="w-full max-w-md mx-auto">
                  <Image
                    src={data.imageUrl}
                    alt={data.title}
                    height={310}
                    width={225}
                    layout="responsive"
                    className="mb-11"
                  />
                </div>
              )}

              <Heading {...data} />
              {width < 1024 && <Information {...data} />}
              <Synopsis text={data.synopsis} />
            </div>
            <ButtonBackTo to="search" />
          </div>
        </div>
      </main>
    </>
  )
}
