interface Props {
  title: string
}

function Text({ title }: Props) {
  return <p className="font-mono text-zinc text-sm uppercase mt-5 md:mt-2">{title}</p>
}

export { Text }
export type { Props as TextProps }
