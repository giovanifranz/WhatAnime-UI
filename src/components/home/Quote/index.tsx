import { memo } from 'react'
import { Stack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { handlePrefetchAnime } from 'utils/http/jikan/jikan-resource'

import { ButtonProps } from './Button'
import { Content } from './Content'

const Button = dynamic<ButtonProps>(() => import('./Button').then((module) => module.Button))

interface Props {
  anime: string
  character: string
  quote: string
  id?: number
  isMobile?: boolean
}

export function QuoteComponent({ anime, character, quote, id, isMobile }: Props) {
  const router = useRouter()

  const rest = {
    anime,
    character,
    quote,
  }

  if (isMobile) {
    return (
      <Stack
        as="a"
        h="120px"
        onClick={() => id && router.push(`/${id}`)}
        onMouseEnter={() => id && handlePrefetchAnime(id)}
        w="200px"
        bgColor="yellow.500"
        borderRadius="5px"
        p="10px"
        _hover={{ cursor: 'pointer', filter: 'brightness(90%)' }}
      >
        <Content {...rest} />
      </Stack>
    )
  }

  return (
    <Stack as="section" h="120px" w="250px" bgColor="yellow.500" borderRadius="5px" p="10px">
      <Content {...rest}>{id && <Button id={id} />}</Content>
    </Stack>
  )
}

const Quote = memo(QuoteComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { Quote }
export type { Props as QuoteProps }
