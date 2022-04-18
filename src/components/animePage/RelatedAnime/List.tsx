import { Heading, Link as ChakraLink, ListItem, UnorderedList } from '@chakra-ui/react'
import NextLink from 'next/link'

import { handlePerfetchAnime } from '../../../utils/handlePerfetchAnime'

export interface ListProps {
  related: Array<{ mal_id: number; name: string }>
  title: string
}

interface LinkProps {
  name: string
  mal_id: number
}

export default function List({ related, title }: ListProps) {
  return (
    <UnorderedList>
      <Heading as="h3" fontSize="1.25rem" fontWeight="bold" mt="20px">
        {title}:
      </Heading>
      {related.map(({ name, mal_id }) => {
        if (name.trim() === '') {
          return null
        }

        return (
          <ListItem mt="5px" key={mal_id}>
            {name && <Link mal_id={mal_id} name={name} />}
          </ListItem>
        )
      })}
    </UnorderedList>
  )
}

export function Link({ name, mal_id }: LinkProps) {
  return (
    <NextLink href={`/${mal_id}`}>
      <ChakraLink onMouseEnter={() => handlePerfetchAnime(mal_id)}>{name}</ChakraLink>
    </NextLink>
  )
}
