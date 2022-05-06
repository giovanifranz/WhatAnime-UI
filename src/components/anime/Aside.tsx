import { memo } from 'react'
import Image from 'next/image'
import { IAnime } from 'types'

import { AlternativeTitles } from './AlternativesTitles'
import Information from './Information'

interface Props {
  anime: IAnime
}

export function AsideComponent({ anime }: Props) {
  const {
    imageUrl,
    title,
    titleEnglish,
    titleJapanese,
    airedString,
    duration,
    type,
    source,
    episodes,
    season,
    studio,
    rating,
    status,
  } = anime
  return (
    <aside className="block w-1/5 h-screen py-8 text-black border-x bg-neutral-400 ">
      <Image src={imageUrl} alt={title} layout="responsive" width={224} height={320} />

      <section className="my-10 ml-2">
        <AlternativeTitles english={titleEnglish} japanese={titleJapanese} />
        <Information
          airedString={airedString}
          duration={duration}
          type={type}
          source={source}
          season={season}
          studio={studio}
          status={status}
          rating={rating}
          episodes={episodes}
        />
      </section>
    </aside>
  )
}

const Aside = memo(AsideComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))
export default Aside
