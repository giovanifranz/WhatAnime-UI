import {
  useContext,
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { queryClient } from "../utils/queryClient";
import { api } from "../utils/api";

export enum SELECT {
  WORD = "WORD",
  IMAGE = "IMAGE",
}
export type SelectContextType = {
  handleSubmit: () => void;
  error: boolean;
  isLoading: boolean;
  select: SELECT;
  animeResults: AnimeResult[];
  setSelect: Dispatch<SetStateAction<SELECT>>;
  payload: string;
  setPayload: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export interface SearchProviderProps {
  children: ReactNode;
}

export interface AnimeResult {
  title: string;
  image_url: string;
  synopsis: string;
  episodes: number;
  score: number;
  mal_id: number;
  similarity?: string;
}

export interface FetchAnimeProps extends AnimeResult {
  start_date: string;
}

const initialContext: SelectContextType = {
  isLoading: false,
  error: false,
  animeResults: [],
  select: SELECT.WORD,
  setSelect: () => {},
  payload: "",
  setPayload: () => {},
  page: 1,
  setPage: () => {},
  handleSubmit: () => {},
};

export const SearchContext = createContext<SelectContextType>(initialContext);
export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }: SearchProviderProps) {
  const [select, setSelect] = useState(SELECT.WORD);
  const [payload, setPayload] = useState("");
  const [animeResults, setAnimeResults] = useState<AnimeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  
  function standardizeAnimeResults(
    data: FetchAnimeProps[],
    similarity?: string
  ) {
    const animeResults = data.map((anime: FetchAnimeProps) => {
      const { start_date } = anime;
      const year = new Date(start_date).getFullYear();
      return {
        ...anime,
        year,
        similarity,
      } as AnimeResult;
    });
    return animeResults;
  }

  async function handleSubmit() {
    if (payload.length < 3 || payload.trim() === "") {
      return;
    } else if (select === SELECT.WORD) {
      setIsLoading(true);
      setError(false);
      const ANIME_BY_NAME = await queryClient.fetchQuery(
        ["anime-by-name", page],
        async () => {
          const { data } = await api.get(`/anime/name/${payload}/${page}`);
          return await data;
        }
      );
      if (ANIME_BY_NAME !== undefined) {
        const animeResults = standardizeAnimeResults(ANIME_BY_NAME);
        setAnimeResults(animeResults);
      } else {
        setError(true);
      }
      setIsLoading(false);
    } else if (select === SELECT.IMAGE) {
      setIsLoading(true);
      setError(false);
      const ANIME_BY_IMAGE = await queryClient.fetchQuery(
        "anime-by-image",
        async () => {
          const { data } = await api.get(`/anime/image/${payload}`);
          return await data;
        }
      );
      if (ANIME_BY_IMAGE !== undefined) {
        const animeResults = standardizeAnimeResults(ANIME_BY_IMAGE);
        setAnimeResults(animeResults);
      } else {
        setError(true);
      }
      setIsLoading(false);
    }
  }

  return (
    <SearchContext.Provider
      value={{
        handleSubmit,
        select,
        setSelect,
        payload,
        setPayload,
        page,
        setPage,
        isLoading,
        error,
        animeResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
