export interface Props {
  text: string
}

export function Synopsis({ text }: Props) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold border-b w-52">Synopsis</h2>
      <p className="text-xl">{text}</p>
    </section>
  )
}
