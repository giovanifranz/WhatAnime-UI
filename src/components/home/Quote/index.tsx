import { Heading, Text, Stack, HStack, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../../utils/api";
import { ButtonQuoteProps } from "./Button";
import dynamic from "next/dynamic";
const Button = dynamic<ButtonQuoteProps>(() => import("./Button"));

interface AnimeQuote {
  anime: string;
  character: string;
  quote: string;
  id: number;
}

interface QuoteProps {
  initialState: AnimeQuote;
}

export default function Quote({ initialState }: QuoteProps) {
  const { data, isLoading } = useQuery<AnimeQuote>(
    "quote",
    async () => {
      const { data } = await api.get("/quote");
      return data;
    },
    {
      initialData: initialState,
      staleTime: 1000 * 5,
    }
  );
  const animeQuote = { ...data } as AnimeQuote;
  return (
    <>
      {isLoading ? (
        <Spinner color="yellow.500" />
      ) : (
        <Stack
          as="section"
          h="120px"
          w="250px"
          bgColor="yellow.500"
          borderRadius="5px"
          p="10px"
        >
          <Text
            fontStyle="italic"
            fontWeight={300}
            fontSize="18px"
            lineHeight="21px"
            w="225px"
            noOfLines={3}
            color="black"
          >
            “{animeQuote.quote}”
          </Text>
          <HStack as="article">
            <Stack h="50px" w="182px" justifyContent="space-between">
              <Heading
                as="h4"
                fontWeight="bold"
                fontStyle="normal"
                fontSize="18px"
                lineHeight="21px"
                color="black"
                mt="8px"
                isTruncated
              >
                “{animeQuote.character}”
              </Heading>
              <Text
                fontStyle="normal"
                fontWeight="normal"
                fontSize="18px"
                lineHeight="21px"
                isTruncated
              >
                “{animeQuote.anime}”
              </Text>
            </Stack>
            {animeQuote.id > 0 ? <Button id={animeQuote.id} /> : null}
          </HStack>
        </Stack>
      )}
    </>
  );
}
