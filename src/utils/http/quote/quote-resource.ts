import axios from 'axios'
import { IQuote, IResponseQuote } from 'types/quote'

import { formatSlug } from '../../common/mappers'

const animeChan = 'https://animechan.vercel.app/api'

function quoteMapper(response: IResponseQuote): IQuote {
  return {
    title: response.anime,
    slug: formatSlug(response.anime),
    character: response.character,
    quote: response.quote,
  }
}

export async function getAnimesQuoteByTitle(title: string): Promise<Array<IQuote>> {
  return axios
    .get(`${animeChan}/quotes/anime?title=${title}`)
    .then(({ data }) => data.map((quote: IResponseQuote) => quoteMapper(quote)))
}

export async function getRandomAnimeQuote(): Promise<IQuote> {
  return axios.get(`${animeChan}/random`).then((response) => {
    const { data } = response
    return quoteMapper(data)
  })
}
