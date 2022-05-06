interface Props {
  text: string
}
export function Title({ text }: Props) {
  return <h1 className="text-3xl font-normal uppercase">{text}</h1>
}
