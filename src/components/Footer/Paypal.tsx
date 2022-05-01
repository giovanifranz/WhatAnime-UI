import { SiPaypal } from 'react-icons/si'
import { Button, Icon } from '@chakra-ui/react'

function Paypal() {
  return (
    <Button
      as="a"
      href="https://www.paypal.com/donate/?hosted_button_id=KJ9TK628E7N42"
      h="75px"
      w="75px"
      bgColor="gray.100"
      color="gray.500"
      borderRadius="50%"
      _hover={{
        bgColor: 'yellow.500',
        color: 'gray.800',
      }}
    >
      <Icon as={SiPaypal} fontSize="50px" />
    </Button>
  )
}

export { Paypal }
