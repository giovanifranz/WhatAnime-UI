import { memo } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { theme } from 'styles/theme'

const yellow = theme.colors.yellow[500]

interface Props extends ButtonProps {
  to: 'top' | 'search'
}

export function ButtonBackToComponent({ to = 'top', ...rest }: Props) {
  const router = useRouter()

  const text = {
    top: 'Back to Top',
    search: 'Back to Search',
  }

  function handleClick() {
    if (to === 'search') router.push('/')
    else globalThis.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Button
      onClick={() => handleClick()}
      textAlign="center"
      textTransform="uppercase"
      fontWeight="bold"
      fontSize="3xl"
      color="gray.500"
      bgColor="yellow.500"
      borderRadius="10px"
      py="10px"
      px="45px"
      transition="0.3s"
      _hover={{
        border: `5px solid ${yellow}`,
        bgColor: 'gray.100',
        color: 'yellow.500',
      }}
      {...rest}
    >
      {text[to]}
    </Button>
  )
}

const ButtonBackTo = memo(ButtonBackToComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { ButtonBackTo }
export type { Props as ButtonBackToProps }
