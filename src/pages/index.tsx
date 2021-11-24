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
        <Stack as="main" spacing="20px" mt="11px">
          <Box as="section">
            <Heading title="Anime of the day" />
            <Flex mt="15px" alignItems="center" justifyContent="space-between">
              <ResultCard value={animeToday} />
              <TopAiring topAiring={home.topAiring} />
            </Flex>
          </Box>
          <Box as="section">
            {animeResults.length > 0 && <Heading title="Results" />}
            <Flex mt="15px" alignItems="center" justifyContent="space-between">
              <Flex
                height="505px"
                direction="column"
                justifyContent="space-between"
              >
                {animeResults.length > 0 && <ResultCard value={animeResult} />}
                <HStack w="100%" justifyContent="space-between">
                  {animeResults.length > 1 && (
                    <MiniCards animeResults={animeResults} />
                  )}
                </HStack>
              </Flex>
              <TopPopular topPopular={home.topPopular} />
            </Flex>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const HOME_DATA: HomeData = await api.get("/home").then((res) => res.data);
  const QUOTE_DATA: AnimeQuoteData = await api
    .get("/quote")
    .then((res) => res.data);
  const ANIME_TODAY: AnimeTodayData = await api
    .get(`/anime/id/${HOME_DATA.animeTodayID}`)
    .then((res) => res.data);
  if (ANIME_TODAY !== undefined) {
    return {
      props: {
        home: HOME_DATA,
        quote: QUOTE_DATA,
        animeToday: ANIME_TODAY,
      },
      revalidate: 60 * 60 * 24,
    };
  } else {
    return {
      props: {
        home: {
          animeToday: SSG.animeToday,
          topAiring: SSG.topAiring,
          topPopular: SSG.topPopular,
        },
        revalidate: 5,
      },
    };
  }
};
