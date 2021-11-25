import { useQuery } from "react-query";
import { api } from "../utils/api";
import { useEffect, useState } from "react";

export interface AnimeQuote {
  anime: string;
  character: string;
  quote: string;
  id: number;
}

export interface Top {
  mal_id: number;
  title: string;
  rank: number;
}

export interface AnimeQuoteData {
  anime: string;
  character: string;
  quote: string;
  id: number;
}

export interface WhatAnimeProps {
  HOME_DATA: HomeData;
  QUOTE_DATA: AnimeQuoteData;
  ANIME_TODAY: AnimeTodayData;
  ID: number;
}

export interface HomeData {
  animeTodayID: number;
  topAiring: Array<Top>;
  topPopular: Array<Top>;
}

export interface AnimeTodayData {
  mal_id: number;
  title: string;
  image_url: string;
  score: number;
  episodes: number;
  synopsis: string;
  similarity?: string;
  aired: {
    prop: {
      from: {
        year: number;
      };
    };
  };
}

export function useDataFetch({
  ID,
  QUOTE_DATA,
  HOME_DATA,
  ANIME_TODAY,
}: WhatAnimeProps) {
  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState<AnimeQuoteData>({
    anime: "",
    character: "",
    quote: "",
    id: 0,
  });
  const [animeToday, setAnimeToday] = useState<AnimeTodayData>();
  const [topAiring, setTopAiring] = useState<Array<Top>>([]);
  const [topPopular, setTopPopular] = useState<Array<Top>>([]);
  const Quote = useQuery<AnimeQuote>(
    "quote",
    async () => {
      const { data } = await api.get("/quote");
      return data;
    },
    {
      initialData: QUOTE_DATA,
    }
  );

  const AnimeToday = useQuery<AnimeTodayData>(
    "anime-today",
    async () => {
      const { data } = await api.get(`/anime/id/${ID}`);
      return data;
    },
    {
      initialData: ANIME_TODAY,
    }
  );

  const Home = useQuery<HomeData>(
    "home",
    async () => {
      const { data } = await api.get("/home");
      return data;
    },
    {
      initialData: HOME_DATA,
    }
  );

  useEffect(() => {
    if (AnimeToday.data && !AnimeToday.isLoading) {
      setTitle(AnimeToday.data.title);
    }
  }, [AnimeToday.data, AnimeToday.isLoading]);

  useEffect(() => {
    if (Quote.data && !Quote.isLoading) {
      setQuote({
        anime: Quote.data.anime,
        character: Quote.data.character,
        quote: Quote.data.quote,
        id: Quote.data.id,
      });
    }
  }, [Quote.data, Quote.isLoading]);

  useEffect(() => {
    if (Home.data && !Home.isLoading) {
      setTopAiring(Home.data.topAiring);
      setTopPopular(Home.data.topPopular);
    }
  }, [Home.data, Home.isLoading]);

  useEffect(() => {
    if (AnimeToday.data && !AnimeToday.isLoading) {
      setAnimeToday(AnimeToday.data);
    }
  }, [AnimeToday.data, AnimeToday.isLoading]);
  return {
    AnimeToday,
    animeToday,
    topAiring,
    topPopular,
    Home,
    quote,
    Quote,
    title,
  };
}
