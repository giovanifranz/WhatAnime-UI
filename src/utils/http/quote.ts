import axios from 'axios'
import { IQuote, IResponseQuote } from 'types/quote'

import { quoteMapper } from 'utils/common'

import { getAnimesByTitleOnJikan } from './jikan'

const animeChan = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ANIMECHAN_API_URL,
})

export async function getAnimesQuoteByTitle(title: string): Promise<Array<IQuote>> {
  const data: IResponseQuote[] = await animeChan
    .get(`quotes/anime?title=${title}`)
    .then((response) => response.data)
  return data.map((quote: IResponseQuote) => quoteMapper(quote))
}

export async function getRandomAnimeQuote(): Promise<IQuote> {
  const data = await animeChan.get<IResponseQuote>('random').then((response) => response.data)
  const quote = quoteMapper(data)

  const animes = await getAnimesByTitleOnJikan(quote.title)
  return {
    ...quote,
    id: animes[0].id ? animes[0].id : undefined,
  }
}
