import { Text, Link } from "@chakra-ui/react";
import { handlePerfetchAnime } from "../../utils/handlePerfetchAnime";
import NextLink from "next/link";

export interface CardsProps {
  animeResults: Array<Anime>;
}

interface Anime {
  mal_id: number;
  title: string;
  image_url: string;
}

function Card({ mal_id, image_url, title }: Anime) {
  return (
    <NextLink href={`/${mal_id}`}>
      <Link
        onMouseEnter={() => handlePerfetchAnime(mal_id)}
        bgImage={image_url}
        bgSize="cover"
        w="160px"
        h="220px"
        border="1px solid black"
        borderRadius="5px"
        _hover={{
          opacity: 0.6,
        }}
      >
        <Text
          px="10px"
          w="158px"
          h="18px"
          borderBottomRadius="5px"
          mt="200px"
          position="absolute"
          bgColor="yellow.500"
          fontStyle="normal"
          fontWeight="normal"
          fontSize="1rem"
          lineHeight="1.25rem"
          color="gray.500"
          isTruncated
          textAlign="center"
        >
          {title}
        </Text>
      </Link>
    </NextLink>
  );
}

export default function MiniCards({ animeResults }: CardsProps) {
  return (
    <>
      {animeResults &&
        animeResults
          .slice(1, 5)
          .map((animeResult: Anime) => (
            <Card
              key={animeResult.mal_id}
              image_url={animeResult.image_url}
              title={animeResult.title}
              mal_id={animeResult.mal_id}
            />
          ))}
    </>
  );
}
