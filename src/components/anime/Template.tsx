import { lazy, memo } from 'react'
import { useWindowSize } from 'react-use'
import { IAnime } from 'types'

import { ButtonBackTo } from 'components'

import { Heading } from './Heading'
import { Synopsis } from './Synopsis'

const Image = lazy(() => import('next/image'))
const Head = lazy(() => import('next/head'))
const Aside = lazy(() => import('./Aside'))
const Information = lazy(() => import('./Information'))

interface Props {
  anime: IAnime
}

export function TemplateComponent({ anime }: Props) {
  const { width } = useWindowSize()

  return (
    <>
      {anime && (
        <Head>
          <title>WhatAnime | {anime.title}</title>
        </Head>
      )}
      <main className="flex flex-col">
        <div className="flex justify-between w-11/12 max-w-6xl mx-auto gap-14 xl:w-9/12">
          {width > 1024 && <Aside anime={anime} />}
          <div className="flex flex-col justify-between pt-5 pb-10 gap-14 lg:w-4/5">
            <div className="flex flex-col gap-3">
              {width < 768 && (
                <div className="w-full max-w-md mx-auto">
                  <Image
                    src={anime.imageUrl}
                    alt={anime.title}
                    height={310}
                    width={225}
                    layout="responsive"
                    className="mb-11"
                  />
                </div>
              )}

              <Heading {...anime} />
              {width < 1024 && <Information {...anime} />}
              <Synopsis text={anime.synopsis} />
            </div>
            <ButtonBackTo to="search" />
          </div>
        </div>
      </main>
    </>
  )
}
const Template = memo(TemplateComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))
export default Template
