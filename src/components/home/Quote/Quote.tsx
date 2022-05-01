import { memo } from 'react'
import { Stack } from '@chakra-ui/react'
import { cacheRandomAnimeQuote } from 'hooks/useQuote'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { IQuote } from 'types/quote'

import { handlePrefetchAnime } from 'utils/http/jikan/jikan-resource'

import { ButtonProps, Content } from '.'

const Button = dynamic<ButtonProps>(() => import('./Button').then((module) => module.Button))

interface Props {
  quote?: IQuote
  isMobile?: boolean
}

export function QuoteComponent({ quote, isMobile = false }: Props) {
  const router = useRouter()

  const { isError, isLoading, data } = cacheRandomAnimeQuote(quote)

  if (isError || isLoading || !data) {
    return null
  }
  const { id } = data

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
        <Content {...data} />
      </Stack>
    )
  }

  return (
    <Stack as="section" h="120px" w="250px" bgColor="yellow.500" borderRadius="5px" p="10px">
      <Content {...data}>{id && <Button id={id} />}</Content>
    </Stack>
  )
}

const Quote = memo(QuoteComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps))

export { Quote }
export type { Props as QuoteProps }
