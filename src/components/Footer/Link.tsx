import { ElementType, memo } from 'react'
import { Button, ButtonProps, Icon } from '@chakra-ui/react'

interface Props extends ButtonProps {
  icon: ElementType
  href: string
}

function LinkComponent({ icon, href, ...rest }: Props) {
  return (
    <Button
      as="a"
      h="55px"
      w="55px"
      href={href}
      borderRadius="8px"
      bgColor="gray.100"
      color="gray.500"
      _hover={{
        bgColor: 'yellow.500',
        color: 'gray.800',
      }}
      {...rest}
    >
      <Icon as={icon} fontSize="40px" />
    </Button>
  )
}

const Link = memo(LinkComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { Link }
export type { Props as LinkProps }