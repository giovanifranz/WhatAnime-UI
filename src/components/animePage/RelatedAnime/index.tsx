import { UnorderedList, Text, Stack, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { LinkProps } from "./Link";
const Link = dynamic<LinkProps>(() => import("./Link"));

interface RelatedAnimeProps {
  related?: {
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

export default function RelatedAnime({ related }: RelatedAnimeProps) {
  return (
    <Box as="article">
      {" "}
      {related && (
        <>
          {related["Side story"] ||
          related["Alternative version"] ||
          related.Other ? (
            <Box as="h2">
              <Text
                fontWeight="bold"
                fontSize="1.375rem"
                lineHeight="1.625rem"
                color="black"
                mt="30px"
              >
                Related Anime
              </Text>
              <Box bgColor="gray.500" w="210px" h="1px" />
            </Box>
          ) : null}
          <Stack
            mt="20px"
            fontSize="1.25rem"
            fontWeight="normal"
            lineHeight="1.5rem"
            fontStyle="normal"
            spacing="20px"
            ml="20px"
          >
            {related["Side story"] && (
              <>
                <Text fontWeight="bold">Side story</Text>
                <UnorderedList>
                  {related["Side story"].map(({ name, mal_id }) => {
                    return (
                      <>
                        {name && (
                          <Link key={mal_id} mal_id={mal_id} name={name} />
                        )}
                      </>
                    );
                  })}
                </UnorderedList>
              </>
            )}
            {related["Alternative version"] && (
              <>
                <Text fontWeight="bold">Alternative version:</Text>
                <UnorderedList>
                  {related["Alternative version"].map(({ name, mal_id }) => {
                    return (
                      <>
                        {name && (
                          <Link key={mal_id} mal_id={mal_id} name={name} />
                        )}
                      </>
                    );
                  })}
                </UnorderedList>
              </>
            )}
            {related.Other && (
              <>
                <Text fontWeight="bold">Other:</Text>
                <UnorderedList>
                  {related.Other.map(({ name, mal_id }) => {
                    return (
                      <>
                        {name && (
                          <Link key={mal_id} mal_id={mal_id} name={name} />
                        )}
                      </>
                    );
                  })}
                </UnorderedList>
              </>
            )}
          </Stack>
        </>
      )}
    </Box>
  );
}