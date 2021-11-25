import {
  ListItem,
  Link,
  UnorderedList,
  Text,
  Stack,
  Box,
} from "@chakra-ui/react";

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
                fontSize="22px"
                lineHeight="26px"
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
            fontSize="20px"
            fontWeight="normal"
            lineHeight="23px"
            fontStyle="normal"
            spacing="20px"
            ml="20px"
          >
            {related["Side story"] ? (
              <>
                <Text fontWeight="bold">Side story</Text>
                <UnorderedList>
                  {related["Side story"].map(({ name, mal_id }) => {
                    return (
                      <Box key={mal_id}>
                        {name && (
                          <ListItem>
                            <Link href={`/${mal_id}`}>{name}</Link>
                          </ListItem>
                        )}
                      </Box>
                    );
                  })}
                </UnorderedList>
              </>
            ) : null}

            {related["Alternative version"] ? (
              <>
                <Text fontWeight="bold">Alternative version:</Text>
                <UnorderedList>
                  {related["Alternative version"].map(({ name, mal_id }) => {
                    return (
                      <Box key={mal_id}>
                        {name && (
                          <ListItem>
                            <Link href={`/${mal_id}`}>{name}</Link>
                          </ListItem>
                        )}
                      </Box>
                    );
                  })}
                </UnorderedList>
              </>
            ) : null}

            {related.Other ? (
              <>
                <Text fontWeight="bold">Other:</Text>
                <UnorderedList>
                  {related.Other.map(({ name, mal_id }) => {
                    return (
                      <Box key={mal_id}>
                        {name && (
                          <ListItem>
                            <Link href={`/${mal_id}`}>{name}</Link>
                          </ListItem>
                        )}
                      </Box>
                    );
                  })}
                </UnorderedList>
              </>
            ) : null}
          </Stack>
        </>
      )}
    </Box>
  );
}
