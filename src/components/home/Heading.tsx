import { Heading as HeadingChakra } from '@chakra-ui/react'

interface HeadingProps {
  title: string
}
export default function Heading({ title }: HeadingProps) {
  return (
    <HeadingChakra
      as="h2"
      fontWeight="normal"
      fontSize="1.75rem"
      lineHeight="2rem"
      color="black"
      textTransform="uppercase"
    >
      {title}
    </HeadingChakra>
  )
}
