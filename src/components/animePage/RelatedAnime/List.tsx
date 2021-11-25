import {
  Heading,
  UnorderedList,
  ListItem,
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
    <UnorderedList>
      <Heading as="h3" fontSize="1.25rem" fontWeight="bold">
        {title}:
      </Heading>
      {related.map(({ name, mal_id }) => {
        return (
          <ListItem key={mal_id}>
            {name && <Link mal_id={mal_id} name={name} />}
          </ListItem>
        );
      })}
    </UnorderedList>
  );
}

export function Link({ name, mal_id }: LinkProps) {
  return (
    <NextLink href={`/${mal_id}`}>
      <ChakraLink onMouseEnter={() => handlePerfetchAnime(mal_id)}>
        {name}
      </ChakraLink>
    </NextLink>
  );
}
