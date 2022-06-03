interface Props {
  episodes: number | null
  title: string
  year?: number | null
  score: number | null
}

export function Heading({ episodes, title, year, score }: Props) {
  return (
    <section className="flex flex-row justify-between gap-3">
      <div>
        <div className="flex gap-3">
          <h1 className="text-3xl font-bold line-clamp-1">{title}</h1>
          {year && <span className="text-3xl font-bold">({year})</span>}
        </div>
        {episodes && <p className="text-xl">Episodes: {episodes}</p>}
      </div>
      {score && (
        <div className="w-20 text-center">
          <div className="py-1 bg-yellow-300 rounded">
            <p className="text-xl font-bold uppercase text-zinc-400">Score</p>
          </div>
          <span className="text-3xl font-bold">{score}</span>
        </div>
      )}
    </section>
  )
}
