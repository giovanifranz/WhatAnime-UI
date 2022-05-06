import slugify from 'slugify'
import { IAnime, IQuote, IResponseAnime, IResponseQuote } from 'types'

export function formatText(text: string): string {
  return text.replace(/[^0-9a-zA-Z]+/g, '').toLowerCase()
}

export function formatSlug(text: string): string {
  return slugify(text, { lower: true, strict: true })
}

export function quoteFormatter(response: IResponseQuote): IQuote {
  return {
    title: response.anime,
    character: response.character,
    quote: response.quote,
  }
}

export function animeFormatter(response: IResponseAnime): IAnime {
  return {
    id: response.mal_id,
    title: response.title,
    titleEnglish: response.title_english,
    titleJapanese: response.title_japanese,
    score: response.score || null,
    type: response.type,
    source: response.source,
    imageUrl: response.images.webp.image_url || response.images.jpg.image_url,
    status: response.status,
    duration: response.duration,
    rating: response.rating,
    episodes: response.episodes || null,
    year: response.year ? response.year : response.aired.prop.from.year,
    airedString: response.aired.string,
    synopsis: response.synopsis ? response.synopsis.replace(' [Written by MAL Rewrite]', '') : null,
  }
}
