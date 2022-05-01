import { Heading as HeadingChakra } from '@chakra-ui/react'

interface Props {
  title: string
}
export function Heading({ title }: Props) {
  return (
    <HeadingChakra as="h1" fontSize="3xl" textTransform="uppercase" fontWeight="normal">
      {title}
    </HeadingChakra>
  )
}
