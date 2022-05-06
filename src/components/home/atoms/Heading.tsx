interface Props {
  title: string
}

function Heading({ title }: Props) {
  return (
    <div className="absolute w-full py-2 bg-yellow-300 border-b border-black border-solid rounded-t">
      <h2 className="text-2xl font-bold text-center uppercase text-zinc-400">{title}</h2>
    </div>
  )
}

export { Heading }
export type { Props as HeadingProps }
