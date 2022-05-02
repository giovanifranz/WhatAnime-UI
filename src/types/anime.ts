export type TFilter = 'airing' | 'bypopularity'

export interface IResponseAnime {
  mal_id: number
  title: string
  title_english: string
  title_japanese: string
  year: number | null
  score: number | null
  type: string
  source: string
  images: {
    jpg: { image_url: string }
  }
  synopsis: string
  status: string
  duration: string
  aired: {
    prop: {
      from: {
        year: number | null
      }
    }
    string: string
  }
  premiered?: string
  rating: string
  episodes: number | null
}

export interface IAnime {
  id: number
  title: string
  titleEnglish: string
  titleJapanese: string
  year?: number | null
  score: number | null
  type: string
  source: string
  imageUrl: string
  synopsis: string | null
  status: string
  duration: string
  airedString: string
  premiered: string | null
  rating: string
  episodes: number | null
  similarity?: string
}

export interface ITop {
  id: number
  title: string
  rank: number
}

export interface IRanking {
  top: ITop[]
}
