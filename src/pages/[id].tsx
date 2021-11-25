import { Flex, Box, Heading as HeadingChakra, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import Aside from "../components/animePage/Aside";
import Heading from "../components/animePage/Heading";
import Text from "../components/animePage/Text";
import RelatedAnime from "../components/animePage/RelatedAnime";
import BackToSearch from "../components/animePage/BackToSearch";
import { api } from "../utils/api";
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

interface AnimePageProps {
  image_url: string;
  synopsis: string;
  title: string;
  year: number;
  score: number;
  image: string;
  title_english?: string;
  title_japanese?: string;
  type: string;
  source: string;
  episodes: number;
  status: string;
  duration: string;
  airedString: string;
  premiered: string;
  studios?: {
    name: string;
  }[];
  rating: string;
  aired: {
    from: string;
  };
  related?: {
    Sequel?: {
      mal_id: number;
      name: string;
      type: string;
    }[];
    Prequel?: {
      mal_id: number;
      name: string;
      type: string;
    }[];
    Other?: {
      mal_id: number;
      name: string;
    }[];
    "Alternative version"?: {
      mal_id: number;
      name: string;
    }[];
    "Side story"?: {
      mal_id: number;
      name: string;
    }[];
  };
}

interface AnimePageProps {
  ANIME_DATA: AnimePageProps;
  mal_id: number;
  error: boolean;
}

export default function AnimePage({ ANIME_DATA, mal_id }: AnimePageProps) {
  const router = useRouter();
  const route = router.query.id as string;
  const id = mal_id ? mal_id : parseInt(route, 10);

  const { data, isLoading } = useQuery<AnimePageProps>(
    ["anime-page", id],
    async () => {
      const { data } = await api.get(`/anime/id/${id}`);
      return data;
    },
    {
      initialData: ANIME_DATA ? ANIME_DATA : undefined,
      staleTime: 1000 * 60,
    }
  );

  if (data && !isLoading) {
    const { aired } = data as AnimePageProps;
    const year = 2006;
    new Date(aired.from).getFullYear();
    const synopsis = data.synopsis.replace("[Written by MAL Rewrite]", "");
    const AnimePage = { ...data, year, synopsis };
    return (
      <Flex w="1105px" minH={900} mx="auto">
        <Aside
          related={AnimePage.related}
          image={AnimePage.image_url}
          title={AnimePage.title}
          title_english={AnimePage.title_english}
          title_japanese={AnimePage.title_japanese}
          type={AnimePage.type}
          source={AnimePage.source}
          episodes={AnimePage.episodes}
          status={AnimePage.status}
          duration={AnimePage.duration}
          airedString={AnimePage.airedString}
          premiered={AnimePage.premiered}
          studios={AnimePage.studios}
          rating={AnimePage.rating}
        />
        <Box mt="25px" ml="20px">
          <Heading
            title={AnimePage.title}
            year={AnimePage.year}
            score={AnimePage.score}
            episodes={AnimePage.episodes}
          />

          <Box w="885px" as="section">
            <Text synopsis={AnimePage.synopsis} />
            <RelatedAnime related={AnimePage.related} />
          </Box>
          <Box mt="50px" w="310px" h="50px" mx="auto" mb="50px">
            <BackToSearch />
          </Box>
        </Box>
      </Flex>
    );
  } else if (isLoading) {
    return <Spinner color="yellow.500" size="xl" />;
  } else {
    return (
      <Flex
        w="1105px"
        minH={900}
        mx="auto"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <HeadingChakra
          as="h1"
          fontSize="2.25rem"
          fontWeight="bold"
          lineHeight="2.5rem"
          fontStyle="normal"
          color="black"
          mb="25px"
        >
          Anime not found: 404
        </HeadingChakra>
        <BackToSearch />
      </Flex>
    );
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "918" } },
      { params: { id: "21" } },
      { params: { id: "20" } },
      { params: { id: "1535" } },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;
  if (params !== undefined) {
    if (typeof params.id === "string") {
      const mal_id = parseInt(params.id, 10);
      const ANIME_DATA: AnimePageProps = await api
        .get(`/anime/id/${mal_id}`)
        .then((res) => res.data);
      return {
        props: {
          ANIME_DATA,
          mal_id,
        },
        revalidate: 60 * 60 * 24,
      };
    }
  }
  return {
    props: {
      ANIME_DATA: undefined,
      mal_id: null,
    },
    revalidate: 5,
  };
};
