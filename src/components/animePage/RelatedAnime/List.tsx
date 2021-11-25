import {
  Text,
  UnorderedList,
  ListItem,
  Box,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { handlePerfetchAnime } from "../../../utils/handlePerfetchAnime";
import NextLink from "next/link";

export interface ListProps {
  related: Array<{ mal_id: number; name: string }>;
  title: string;
}

interface LinkProps {
  name: string;
  mal_id: number;
}

export default function List({ related, title }: ListProps) {
  return (
    <>
      <Text fontWeight="bold">{title}:</Text>
      <UnorderedList>
        {related.map(({ name, mal_id }) => {
          return (
            <Box key={mal_id}>
              {name && <Link mal_id={mal_id} name={name} />}
            </Box>
          );
        })}
      </UnorderedList>
    </>
  );
}

export function Link({ name, mal_id }: LinkProps) {
  return (
    <ListItem key={mal_id}>
      <NextLink href={`/${mal_id}`}>
        <ChakraLink onMouseEnter={() => handlePerfetchAnime(mal_id)}>
          {name}
        </ChakraLink>
      </NextLink>
    </ListItem>
  );
}
