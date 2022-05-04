interface Props {
  title: string
}

function Heading({ title }: Props) {
  return (
    <div className="bg-yellow-300 w-full border-b border-solid border-black absolute rounded-t py-2">
      <h2 className="text-2xl text-zinc-400 font-bold text-center uppercase">{title}</h2>
    </div>
  )
}

export { Heading }
export type { Props as HeadingProps }
