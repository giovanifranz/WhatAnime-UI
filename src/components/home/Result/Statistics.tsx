interface Props {
  value: number | string
}

function Statistics({ value }: Props) {
  return (
    <div className="w-24 h-6 font-bold text-center">
      <p className="p-1 text-sm uppercase bg-yellow-300 rounded text-zinc-400">
        {typeof value === 'number' ? 'Score' : 'Similarity'}
      </p>
      <span className="text-lg">{value}</span>
    </div>
  )
}

export { Statistics }
export type { Props as StatisticsProps }
