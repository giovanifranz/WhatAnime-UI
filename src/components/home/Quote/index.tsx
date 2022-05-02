import { memo } from 'react'
import { Stack } from '@chakra-ui/react'
import { useRandomAnimeQuote } from 'hooks/useQuote'
import { useRouter } from 'next/router'
import { IQuote } from 'types/quote'

import { handlePrefetchAnime } from 'utils/http/jikan/jikan-resource'

import { Content } from './Content'

interface Props {
  quote?: IQuote
  isMobile?: boolean
}

export function QuoteComponent({ quote, isMobile = false }: Props) {
  const router = useRouter()

  const { isError, isLoading, data } = useRandomAnimeQuote(quote)

  if (isError || isLoading || !data) {
    return null
  }
  const { id } = data

  if (isMobile) {
    return (
      <Stack
        as="a"
        onClick={() => id && router.push(`/${id}`)}
        onMouseEnter={() => id && handlePrefetchAnime(id)}
        w="200px"
        maxH="175px"
        bgColor="yellow.500"
        borderRadius="5px"
        p="10px"
        _hover={{ cursor: 'pointer', filter: 'brightness(90%)' }}
      >
        <Content {...data} id={id} />
      </Stack>
    )
  }

  return (
    <Stack as="section" maxH="165px" w="250px" bgColor="yellow.500" borderRadius="5px" p="10px">
      <Content {...data} id={id} />
    </Stack>
  )
}

const Quote = memo(QuoteComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { Quote }
export type { Props as QuoteProps }
