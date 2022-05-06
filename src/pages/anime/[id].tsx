import { lazy, useEffect, useState } from 'react'
import { useAnimeByIdOnJikan } from 'hooks'
import { useRouter } from 'next/router'

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
        </div>
      </main>
    </>
  )
}
