import { ListItem, Link as ChakraLink } from "@chakra-ui/react";
import { handlePerfetchAnime } from "../../../utils/handlePerfetchAnime";
import NextLink from "next/link";

export interface LinkProps {
  name: string;
  mal_id: number;
}

export default function Link({name, mal_id}: LinkProps) {
  return (
    <ListItem>
      <NextLink href={`/${mal_id}`}>
        <ChakraLink onMouseEnter={() => handlePerfetchAnime(mal_id)}>
          {name}
        </ChakraLink>
      </NextLink>
    </ListItem>
  );
}