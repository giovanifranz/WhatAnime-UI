import { Heading } from '@chakra-ui/react'

interface Props {
  text: string
}
export function Title({ text }: Props) {
  return (
    <Heading as="h1" fontSize="3xl" textTransform="uppercase" fontWeight="normal">
      {text}
    </Heading>
  )
}
