import { SiPaypal } from 'react-icons/si'
import { Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Paypal() {
  return (
    <NextLink href="https://www.paypal.com/donate/?hosted_button_id=KJ9TK628E7N42" passHref>
      <Link>
        <Flex
          justifyContent="center"
          alignItems="center"
          w="74px"
          h="74px"
          p={0}
          bgColor="gray.100"
          color="gray.500"
          borderRadius="50%"
          _hover={{
            bgColor: 'yellow.500',
            color: 'gray.800',
          }}
        >
          <SiPaypal size="50px" />
        </Flex>
      </Link>
    </NextLink>
  )
}
