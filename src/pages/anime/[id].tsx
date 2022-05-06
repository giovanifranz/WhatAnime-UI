import { lazy, useEffect, useState } from 'react'
import { useAnimeByIdOnJikan } from 'hooks'
import { useRouter } from 'next/router'

import { ButtonBackTo } from 'components'
import { Synopsis } from 'components/anime'

const Head = lazy(() => import('next/head'))
const Aside = lazy(() => import('components/anime/Aside'))

export default function AnimePage() {
  const router = useRouter()
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
          <Aside anime={data} />
          <div className="flex flex-col justify-between w-4/5 pt-5 pb-10 mb- gap-3">
            <Synopsis text={data.synopsis} />
            <ButtonBackTo to="search" />
          </div>
        </div>
      </main>
    </>
  )
}
