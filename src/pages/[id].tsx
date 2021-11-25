import { Flex, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Aside from "../components/animePage/Aside";
import Heading from "../components/animePage/Heading";
import Text from "../components/animePage/Text";
import RelatedAnime from "../components/animePage/RelatedAnime";
import BackToSearch from "../components/animePage/BackToSearch";
import { api } from "../utils/api";

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

export default function AnimePage() {
  const route = useRouter().query.id;
  console.log(route);

  const { data, isLoading } = useQuery<AnimePageProps>(
    ["anime-page", route],
    async () => {
      const { data } = await api.get(`/anime/id/${route}`);
      return data;
    }
  );
  if (data) {
    const { aired } = data as AnimePageProps;
    const year = new Date(aired.from).getFullYear();
    const synopsis = data.synopsis.replace("[Written by MAL Rewrite]", "");
    const AnimePage = { ...data, year, synopsis };
    return (
      <Flex w="1105px" minH={900} mx="auto">
        {isLoading && !data ? (
          "Loading..."
        ) : (
          <>
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
          </>
        )}
      </Flex>
    );
  } else {
    return null;
  }
}
