import { Text } from './Text'

interface Props {
  english?: string
  japanese?: string
}

export function AlternativeTitles({ english, japanese }: Props) {
  return (
    <div>
      <h3 className="text-xl font-bold">
        <span className="underline">Alternative</span> Titles:
      </h3>
      <div className="flex flex-col my-3 text-sm text gap-1">
        {english && <Text value={english} item="english" />}
        {japanese && <Text value={japanese} item="japanese" />}
      </div>
    </div>
  )
}
