import { Text } from './Text'

interface Props {
  airedString: string
  duration: string
  type: string
  source: string
  rating: string
  season?: string
  status: string
  studio?: string
  episodes: number | null
}

export function Information({
  airedString,
  duration,
  rating,
  episodes,
  source,
  type,
  status,
  season,
  studio,
}: Props) {
  return (
    <div>
      <h3 className="text-xl font-bold underline">Information:</h3>
      <div className="flex flex-col my-3 text-sm gap-1 text">
        <Text value={type} item="type" />
        <Text value={source} item="source" />
        {episodes && <Text value={episodes} item="episodes" />}
        <Text value={duration} item="duration" />
        <Text value={status} item="status" />
        <Text value={airedString} item="aired" />
        {season && <Text value={season} item="season" />}
        {studio && <Text value={studio} item="studio" />}
        <Text value={rating} item="rating" />
      </div>
    </div>
  )
}
