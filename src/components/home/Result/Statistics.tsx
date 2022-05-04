interface Props {
  value: number | string
}

function Statistics({ value }: Props) {
  return (
    <div className="w-24 text-center font-bold h-6">
      <p className="text-sm text-zinc-400 uppercase bg-yellow-300 p-1 rounded">
        {typeof value === 'number' ? 'Score' : 'Similarity'}
      </p>
      <span className="text-lg">{value}</span>
    </div>
  )
}

export { Statistics }
export type { Props as StatisticsProps }
