import { Flex, Box, Stack, HStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { api } from "../utils/api";
import Search from "../components/home/Search";
import Quote from "../components/home/Quote";
import Heading from "../components/home/Heading";
import ResultCard from "../components/home/ResultCard";
import TopAiring from "../components/home/Ranking/TopAiring";
import TopPopular from "../components/home/Ranking/TopPopular";
import MiniCards from "../components/home/MiniCards";
import { useSearch } from "../hooks/useSearch";
import { SSG } from "../utils/SSG";
import BackToTop from "../components/home/BackToTop";

interface HomeData {
  animeTodayID: number;
  topAiring: Array<Top>;
  topPopular: Array<Top>;
}

interface Top {
  mal_id: number;
  title: string;
  rank: number;
}

interface AnimeQuoteData {
  anime: string;
  character: string;
  quote: string;
  id: number;
}

interface WhatAnimeProps {
  home: HomeData;
  quote: AnimeQuoteData;
  animeToday: AnimeTodayData;
}

interface AnimeTodayData {
  mal_id: number;
  title: string;
  image_url: string;
  score: number;
  episodes: number;
  synopsis: string;
  similarity?: string;
}

export default function WhatAnime({ animeToday, home, quote }: WhatAnimeProps) {
  const { animeResults } = useSearch();
  const animeResult = { ...animeResults[0] };
  return (
    <>
      <Box maxW={1110} minW={1050} margin="0 auto 60px">
        <Flex mt="25px" alignItems="center" justifyContent="space-between">
          <Search />
          <Quote initialState={quote} />
        </Flex>
      </Box>
    </>
  );
}
