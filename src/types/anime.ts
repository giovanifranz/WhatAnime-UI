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
  premiered: string
  rating: string
  episodes: number | null
}

export interface IAnime {
  mal_id: number
  slug: string
  title: string
  title_english: string
  title_japanese: string
  year: number | null
  score: number | null
  type: string
  source: string
  image_url: string
  synopsis: string | null
  status: string
  duration: string
  aired_string: string
  premiered: string
  rating: string
  episodes: number | null
}

export interface ITop {
  mal_id: number
  title: string
  rank: number
}

export interface IRanking {
  top: ITop[]
}
