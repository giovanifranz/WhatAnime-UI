import {
  Link,
  ListItem,
  Text,
  OrderedList,
  Box,
  Stack,
} from "@chakra-ui/react";
import Heading from "./Heading";
import { handlePerfetchAnime } from "../../../utils/handlePerfetchAnime";
import NextLink from "next/link";

interface RankingProps {
  topAiring: Array<Top>;
}

interface Top {
  mal_id: number;
  title: string;
  rank: number;
}

export default function Airing({ topAiring }: RankingProps) {
  return (
    <Box
      w="250px"
      h="220.5px"
      bgColor="white"
      border="1px solid black"
      borderRadius="5px"
    >
      <Heading title="Top Airing" />
      <OrderedList
        ml="40px"
        fontStyle="normal"
        fontWeight="normal"
        fontSize="16px"
        lineHeight="19px"
        color="black"
      >
        <Stack mt="16px" spacing="10px">
          {topAiring &&
            topAiring.map((anime) => {
              return (
                <ListItem key={anime.mal_id}>
                  <NextLink href={`/${anime.mal_id}`}>
                    <Link
                      onMouseEnter={() => handlePerfetchAnime(anime.mal_id)}
                    >
                      <Text isTruncated maxW="190px">
                        {anime.title}
                      </Text>
                    </Link>
                  </NextLink>
                </ListItem>
              );
            })}
        </Stack>
      </OrderedList>
    </Box>
  );
}