import { useQuery } from 'react-query'
import { IQuote } from 'types/quote'

import { getAnimesQuoteByTitle, getRandomAnimeQuote } from 'utils/http/quote'

export function useRandomAnimeQuote() {
  return useQuery<IQuote>('quote', async () => getRandomAnimeQuote(), {
    staleTime: 1000 * 60,
  })
}

export function useAnimesQuoteByTitle(title: string) {
  return useQuery<IQuote[]>(['quotes-by-name', title], async () => getAnimesQuoteByTitle(title), {
    staleTime: 1000 * 60,
  })
}
