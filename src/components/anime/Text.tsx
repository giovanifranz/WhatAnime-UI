interface Props {
  value: string | number
  item: string
}

export function Text({ value, item }: Props) {
  return (
    <p>
      <strong className="capitalize">{item}: </strong>
      {value}
    </p>
  )
}
