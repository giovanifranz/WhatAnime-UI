interface Props {
  value: number | string
}

function Statistics({ value }: Props) {
  return (
    <div className="w-24 text-center font-bold">
      <p className="text-sm text-zinc-400 uppercase bg-yellow-300 px-1 rounded">
        {typeof value === 'number' ? 'Score' : 'Similarity'}
      </p>
      <p className="text-lg">{value}</p>
    </div>
  )
}

export { Statistics }
export type { Props as StatisticsProps }
