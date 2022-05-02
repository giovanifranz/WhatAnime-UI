import { Box, Heading as HeadingChakra } from '@chakra-ui/react'

interface Props {
  title: string
}

function Heading({ title }: Props) {
  return (
    <Box bgColor="yellow.500" w="100%" h="50px" borderBottom="1px solid black" position="absolute" py="10px">
      <HeadingChakra
        textAlign="center"
        color="gray.500"
        fontWeight="bold"
        fontSize="2xl"
        textTransform="uppercase"
      >
        {title}
      </HeadingChakra>
    </Box>
  )
}

export { Heading }
export type { Props as HeadingProps }
