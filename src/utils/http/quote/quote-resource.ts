import axios from 'axios'
import { IQuote, IResponseQuote } from 'types/quote'

import { getAnimesByTitleOnJikan } from '../jikan/jikan-resource'

const animeChan = 'https://animechan.vercel.app/api'

function quoteMapper(response: IResponseQuote): IQuote {
  return {
    title: response.anime,
    character: response.character,
    quote: response.quote,
  }
}

export async function getAnimesQuoteByTitle(title: string): Promise<Array<IQuote>> {
  const data: IResponseQuote[] = await axios
    .get(`${animeChan}/quotes/anime?title=${title}`)
    .then((response) => response.data)
  return data.map((quote: IResponseQuote) => quoteMapper(quote))
}

export async function getRandomAnimeQuote(): Promise<IQuote> {
  const data = await axios.get<IResponseQuote>(`${animeChan}/random`).then((response) => response.data)
  const quote = quoteMapper(data)
  const animes = await getAnimesByTitleOnJikan(quote.title)

  return {
    ...quote,
    id: animes[0].id ? animes[0].id : undefined,
  }
}
