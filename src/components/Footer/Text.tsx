import { Text as ChakraText } from '@chakra-ui/react'

interface Props {
  title: string
}

function Text({ title }: Props) {
  return (
    <ChakraText
      mt={['10px', '10px', '20px']}
      fontFamily="Nova Mono"
      fontSize="20px"
      color="white"
      textTransform="uppercase"
    >
      {title}
    </ChakraText>
  )
}

export { Text }
export type { Props as TextProps }
