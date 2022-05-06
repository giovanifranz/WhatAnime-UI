interface Props {
  title: string
}

function Text({ title }: Props) {
  return <p className="mt-5 font-mono text-sm uppercase text-zinc md:mt-2">{title}</p>
}

export { Text }
export type { Props as TextProps }
