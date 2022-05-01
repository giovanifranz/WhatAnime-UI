import { Button } from '@chakra-ui/react'

export default function BackToTop() {
  return (
    <Button
      w="250px"
      h="50px"
      mx="auto"
      bgColor="yellow.500"
      borderRadius="10px"
      fontWeight="bold"
      fontStyle="normal"
      fontSize="1.625rem"
      lineHeight="1.825rem"
      color="gray.500"
      textTransform="uppercase"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      transition="0.7s"
      _hover={{
        border: '5px solid #F5DF4D',
        bgColor: 'gray.100',
        color: 'yellow.500',
      }}
    >
      Back To Top
    </Button>
  )
}
