interface Props {
  synopsis: string
}

function Synopsis({ synopsis }: Props) {
  return (
    <>
      <h3 className="font-bold text-lg">Synopsis</h3>
      <p className="w-full text-lg line-clamp-4">{synopsis}</p>
    </>
  )
}

export { Synopsis }
export type { Props as SynopsisProps }
