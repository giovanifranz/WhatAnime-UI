import { Text, Flex, Box, Heading, Image } from "@chakra-ui/react";
import { api } from "../../../utils/api";
import { useQuery } from "react-query";

import Button from "./Button";

export interface ResultCardProps {
  value: Value;
}

interface Value {
  mal_id: number;
  title: string;
  image_url: string;
  score: number;
  episodes: number;
  synopsis: string;
  similarity?: string;
}

export default function ResultCard({ value }: ResultCardProps) {
  const { data } = useQuery<Value>(
    ["anime-result", value.mal_id],
    async () => {
      const { data } = await api.get(`/anime/id/${value.mal_id}`);
      return data;
    },
    {
      initialData: value,
    }
  );
  const animeResult = { ...data } as Value;
  return (
    <Flex
      as="article"
      w="790px"
      h="220px"
      bgColor="white"
      border="1px solid black"
      borderRadius="5px"
    >
      <Image
        src={animeResult.image_url}
        w="161px"
        h="220.1px"
        border="1px solid black"
        borderLeftRadius="5px"
        bgSize="cover"
        ml="-1px"
        mt="-1.1px"
        alt="Anime Banner"
      />
      <Box ml="10px" mt="10px">
        <Flex justifyContent="space-between">
          <Flex>
            <Heading
              as="h3"
              fontStyle="normal"
              fontWeight="bold"
              fontSize="1.25rem"
              lineHeight="1.5rem"
              color="black"
              maxW="225px"
              isTruncated
            >
              {animeResult.title}
            </Heading>
            <Box w="45px" h="45px" ml="12px">
              <Heading
                as="h4"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="12px"
                lineHeight="14px"
                color="gray.500"
                textTransform="uppercase"
                bgColor="yellow.500"
                w="45px"
                h="20px"
                py="2.5px"
                textAlign="center"
                borderRadius="4px"
                mt="2px"
              >
                Score
              </Heading>
              <Text
                textAlign="center"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="1.25rem"
                lineHeight="1.5rem"
                color="black"
              >
                {animeResult.score}
              </Text>
            </Box>
            {animeResult.similarity ? (
              <Box w="45px" h="45px" ml="12px">
                <Heading
                  as="h4"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize="12px"
                  lineHeight="14px"
                  color="gray.500"
                  textTransform="uppercase"
                  bgColor="yellow.500"
                  w="80px"
                  h="20px"
                  py="2.5px"
                  textAlign="center"
                  borderRadius="4px"
                  mt="2px"
                >
                  Similarity
                </Heading>
                <Text
                  w="80px"
                  pl="3px"
                  textAlign="center"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize="1.25rem"
                  lineHeight="1.5rem"
                  color="black"
                >
                  {animeResult.similarity}
                </Text>
              </Box>
            ) : null}
          </Flex>
          <Button id={animeResult.mal_id} />
        </Flex>
        <Text
          fontStyle="normal"
          fontWeight="normal"
          fontSize="16px"
          lineHeight="19px"
          color="black"
          mt="-15px"
        >
          Episodes: {animeResult.episodes}
        </Text>
        <Heading
          as="h4"
          fontStyle="normal"
          fontWeight="bold"
          fontSize="16px"
          lineHeight="20px"
          color="black"
          mt="20px"
        >
          Synopsis
        </Heading>

        <Text
          fontStyle="normal"
          fontWeight="normal"
          fontSize="16px"
          lineHeight="19px"
          color="black"
          w="610px"
          h="93px"
          mt="5px"
          noOfLines={5}
        >
          {animeResult.synopsis}
        </Text>
      </Box>
    </Flex>
  );
}
