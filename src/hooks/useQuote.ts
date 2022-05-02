import { useQuery } from 'react-query'
import { IQuote } from 'types/quote'

import { getAnimesQuoteByTitle, getRandomAnimeQuote } from 'utils/http/quote/quote-resource'

export function useRandomAnimeQuote(quote: IQuote | undefined) {
  return useQuery<IQuote>('quote', async () => getRandomAnimeQuote(), {
    initialData: quote,
    staleTime: 1000 * 60,
  })
}

export function useAnimesQuoteByTitle(quote: IQuote[], title: string) {
  return useQuery<IQuote[]>(['quotes-by-name', title], async () => getAnimesQuoteByTitle(title), {
    initialData: quote,
    staleTime: 1000 * 60,
  })
}