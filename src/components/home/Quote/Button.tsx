import { HiArrowRight } from 'react-icons/hi'
import { IconButton } from '@chakra-ui/react'
import Link from 'next/link'
import { theme } from 'styles/theme'

import { handlePrefetchAnime } from 'utils/common/queryClient'

export interface Props {
  id: number
}

const { colors } = theme

function Button({ id }: Props) {
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

export { Button }
export type { Props as ButtonProps }
