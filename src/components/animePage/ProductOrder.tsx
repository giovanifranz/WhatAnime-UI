import { Box, Heading, Text, Link, Stack } from "@chakra-ui/react";
import { handlePerfetchAnime } from "../../utils/handlePerfetchAnime";
import NextLink from "next/link";

export interface ProductOrderProps {
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
}

export default function ProductOrder({ Sequel, Prequel }: ProductOrderProps) {
  return (
    <Box as="section">
      <Heading
        as="h3"
        fontSize="1.25rem"
        fontWeight="bold"
        lineHeight="1.30rem"
        mt="30px"
      >
        Production Order:
      </Heading>
      <Stack
        mt="10px"
        fontWeight="normal"
        lineHeight="1rem"
        fontSize="0.875.rem"
        mb="50px"
        spacing="5px"
      >
        <Text>
          <strong>Sequel: </strong>
          {Sequel && (
            <NextLink href={`/${Sequel[0].mal_id}`}>
              <Link onMouseEnter={() => handlePerfetchAnime(Sequel[0].mal_id)}>
                {Sequel[0].name}
              </Link>
            </NextLink>
          )}
        </Text>
        <Text>
          <strong>Prequel: </strong>
          {Prequel && (
            <NextLink href={`/${Prequel[0].mal_id}`}>
              <Link onMouseEnter={() => handlePerfetchAnime(Prequel[0].mal_id)}>
                {Prequel[0].name}
              </Link>
            </NextLink>
          )}
        </Text>
      </Stack>
    </Box>
  );
}