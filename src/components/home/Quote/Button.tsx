import { memo } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { IconButton } from '@chakra-ui/react'
import Link from 'next/link'
import { theme } from 'styles/theme'

import { handlePrefetchAnime } from 'utils/http/jikan/jikan-resource'

export interface Props {
  id: number
}

const { colors } = theme

function ButtonComponent({ id }: Props) {
  return (
    <Link href={`/${id}`} passHref>
      <IconButton
        as="a"
        onMouseEnter={() => handlePrefetchAnime(id)}
        aria-label="Search in database"
        h="40px"
        w="40px"
        bgColor="grey.100"
        color="grey.500"
        transition="0.5s"
        fontSize="25px"
        icon={<HiArrowRight />}
        _hover={{
          bgColor: colors.gray[500],
          color: colors.yellow[500],
        }}
      />
    </Link>
  )
}

const Button = memo(ButtonComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { Button }
export type { Props as ButtonProps }
