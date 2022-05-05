import axios from 'axios'
import { IQuote, IResponseQuote } from 'types/quote'

import { isDevEnvironment } from 'utils'

import { getAnimesByTitleOnJikan } from '../jikan/jikan-resource'

const IS_DEV = isDevEnvironment()

const animeChan = 'https://animechan.vercel.app/api'

function quoteMapper(response: IResponseQuote): IQuote {
  return {
    title: response.anime,
    character: response.character,
    quote: response.quote,
  }
}

export async function getAnimesQuoteByTitle(title: string): Promise<Array<IQuote>> {
  const param = IS_DEV ? 'gintama' : title
  const data: IResponseQuote[] = await axios
    .get(`${animeChan}/quotes/anime?title=${param}`)
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
