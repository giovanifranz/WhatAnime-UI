import { Box, Heading, Text, Stack, Image } from "@chakra-ui/react";
import { ProductOrderProps } from "../../components/animePage/ProductOrder";
import dynamic from "next/dynamic";
const ProductOrder = dynamic<ProductOrderProps>(
  () => import("../../components/animePage/ProductOrder")
);

interface AsideProps {
  title: string;
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
  };
}

export default function Aside({
  related,
  image,
  title,
  title_english,
  title_japanese,
  type,
  source,
  episodes,
  status,
  duration,
  airedString,
  premiered,
  studios,
  rating,
}: AsideProps) {
  return (
    <Box
      as="aside"
      minH={900}
      w="225px"
      borderX="1px solid black"
      bgColor="gray.100"
    >
      <Image
        h="315px"
        w="100%"
        borderY="1px solid black"
        mt="30px"
        src={image}
        alt={title}
      />
      <Box ml="5px" fontStyle="normal" color="black">
        {(title_english || title_japanese) && (
          <Box as="section">
            <Heading
              as="h3"
              fontSize="20px"
              fontWeight="bold"
              lineHeight="23px"
              mt="40px"
            >
              Alternative Titles:
            </Heading>
            <Stack
              as="section"
              lineHeight="16px"
              fontSize="14px"
              mt="10px"
              fontWeight="normal"
            >
              {title_english && (
                <Text>
                  <strong>English: </strong>
                  {title_english}
                </Text>
              )}
              {title_japanese && (
                <Text>
                  <strong>Japanese: </strong>
                  {title_japanese}
                </Text>
              )}
            </Stack>
          </Box>
        )}
        <Box as="section">
          <Heading
            as="h3"
            fontSize="20px"
            fontWeight="bold"
            lineHeight="23px"
            mt="30px"
          >
            Information:
          </Heading>
          <Stack
            lineHeight="16px"
            fontSize="14px"
            fontWeight="normal"
            my="10px"
            spacing="8px"
          >
            <Text>
              <strong>Type: </strong>
              {type}
            </Text>
            <Text>
              <strong>Source: </strong>
              {source}
            </Text>
            <Text>
              <strong>Episodes: </strong>
              {episodes}
            </Text>
            <Text>
              <strong>Duration: </strong>
              {duration}
            </Text>
            <Text>
              <strong>Status: </strong>
              {status}
            </Text>
            <Text>
              <strong>Aired: </strong>
              {airedString}
            </Text>
            <Text>
              <strong>Premiered: </strong>
              {premiered}
            </Text>
            <Text>
              <strong>Studio: </strong>
              {studios && studios.length > 0 ? studios[0].name : "-"}
            </Text>
            <Text>
              <strong>Rating: </strong>
              {rating}
            </Text>
          </Stack>
        </Box>
        {related && (
          <ProductOrder Sequel={related.Sequel} Prequel={related.Prequel} />
        )}
      </Box>
    </Box>
  );
}
