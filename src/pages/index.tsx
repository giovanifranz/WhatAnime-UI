//libs
import { Flex, Box, Stack, HStack } from "@chakra-ui/react";
import Head from "next/head";
import dynamic from "next/dynamic";
//components
import Search from "../components/home/Search";
import Heading from "../components/home/Heading";
import ResultCard from "../components/home/ResultCard";
import TopAiring from "../components/home/Ranking/TopAiring";
import TopPopular from "../components/home/Ranking/TopPopular";
import BackToTop from "../components/home/BackToTop";
//utils
import { api } from "../utils/api";
import { SSG } from "../utils/SSG";
//hooks
import { useSearch } from "../hooks/useSearch";
import { useDataFetch } from "../hooks/useDataFetch";
//props
import { QuoteProps } from "../components/home/Quote";
import { CardsProps } from "../components/home/MiniCards";
import {
  WhatAnimeProps,
  HomeData,
  AnimeQuoteData,
  AnimeTodayData,
} from "../hooks/useDataFetch";
import { GetStaticProps } from "next";
//dyanmic components
const MiniCards = dynamic<CardsProps>(
  () => import("../components/home/MiniCards")
);
const QuoteComponent = dynamic<QuoteProps>(
  () => import("../components/home/Quote")
);

export default function WhatAnime({
  ID,
  HOME_DATA,
  QUOTE_DATA,
  ANIME_TODAY,
}: WhatAnimeProps) {
  const { animeResults } = useSearch();
  const animeResult = { ...animeResults[0] };

  const {
    AnimeToday,
    animeToday,
    topAiring,
    topPopular,
    Home,
    quote,
    Quote,
    title,
  } = useDataFetch({
    ID,
    HOME_DATA,
    QUOTE_DATA,
    ANIME_TODAY,
  });

  return (
    <Box as="main" maxW={1110} minW={1050} margin="0 auto 60px">
      {!AnimeToday.isLoading && !Home.isLoading && !Quote.isLoading && (
        <>
          <Head>
            <title>WhatAnime | {title}</title>
          </Head>
          <Flex mt="25px" alignItems="center" justifyContent="space-between">
            <Search />
            <QuoteComponent
              anime={quote.anime}
              quote={quote.quote}
              character={quote.character}
              id={quote.id}
            />
          </Flex>
          <Stack as="section" spacing="20px" mt="11px">
            <Box as="article">
              <Heading title="Anime of the day" />
              <Flex
                mt="15px"
                alignItems="center"
                justifyContent="space-between"
              >
                {animeToday ? (
                  <ResultCard value={animeToday} />
                ) : (
                  <Box w="790px" h="220px"/>
                )}
                <TopAiring topAiring={topAiring} />
              </Flex>
            </Box>
            <Box as="article">
              {animeResults.length > 0 && <Heading title="Results" />}
              <Flex
                mt="15px"
                alignItems="center"
                justifyContent="space-between"
              >
                <Flex
                  height="505px"
                  direction="column"
                  justifyContent="space-between"
                >
                  {animeResults.length > 0 && (
                    <ResultCard value={animeResult} />
                  )}
                  <HStack w="100%" justifyContent="space-between">
                    {animeResults.length > 1 && (
                      <MiniCards animeResults={animeResults} />
                    )}
                  </HStack>
                </Flex>
                <TopPopular topPopular={topPopular} />
              </Flex>
            </Box>
            <Flex as="div" mt="15px" w="790px" justifyContent={"center"}>
              <BackToTop />
            </Flex>
          </Stack>
        </>
      )}
    </Box>
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
        ID: HOME_DATA.animeTodayID,
        HOME_DATA,
        QUOTE_DATA,
        ANIME_TODAY,
      },
      revalidate: 60 * 60 * 24,
    };
  } else {
    return {
      props: {
        home: {
          ID: 918,
          animeToday: SSG.animeToday,
          topAiring: SSG.topAiring,
          topPopular: SSG.topPopular,
        },
        revalidate: 5,
      },
    };
  }
};
