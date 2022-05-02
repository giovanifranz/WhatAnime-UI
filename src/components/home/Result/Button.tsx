import { memo } from 'react'
import { Button as ChakraButton, Link } from '@chakra-ui/react'
import { theme } from 'styles/theme'

import { handlePrefetchAnime } from 'utils/http/jikan/jikan-resource'

interface Props {
  id: number
}

const yellow = theme.colors.yellow[500]

export function ButtonComponent({ id }: Props) {
  return (
    <Link href={`/${id}`} _hover={{ textDecoration: 'none' }} onMouseEnter={() => handlePrefetchAnime(id)}>
      <ChakraButton
        textAlign="center"
        textTransform="uppercase"
        fontWeight="bold"
        color="gray.500"
        bgColor="yellow.500"
        borderRadius="5px"
        py="10px"
        w="150px"
        h="40px"
        transition="0.3s"
        _hover={{
          border: `5px solid ${yellow}`,
          bgColor: 'white',
          color: 'yellow.500',
        }}
      >
        Go to Page
      </ChakraButton>
    </Link>
  )
}

const Button = memo(ButtonComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { Button }
export type { Props as ButtonProps }