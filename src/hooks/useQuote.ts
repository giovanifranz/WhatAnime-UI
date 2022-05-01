import { useQuery } from 'react-query'
import { IQuote } from 'types/quote'

import { getAnimesQuoteByTitle, getRandomAnimeQuote } from 'utils/http/quote/quote-resource'

export function cacheRandomAnimeQuote(quote: IQuote) {
  return useQuery<IQuote>('quote', async () => getRandomAnimeQuote(), {
    initialData: quote,
  })
}

export function cacheAnimesQuoteByTitle(quote: IQuote[], title: string) {
  return useQuery<IQuote[]>('quotes-by-name', async () => getAnimesQuoteByTitle(title), {
    initialData: quote,
  })
}
