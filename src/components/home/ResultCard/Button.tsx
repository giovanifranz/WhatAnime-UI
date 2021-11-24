import { Link, Button as ChakraButton } from "@chakra-ui/react";
import { handlePerfetchAnime } from "../../../utils/handlePerfetchAnime";
import NextLink from "next/link";

interface ButtonProps {
  id: number;
}

export default function Button({ id }: ButtonProps) {
  return (
    <NextLink href={`/${id}`}>
      <Link _hover={{ textDecoration: "none" }} onMouseEnter={() => handlePerfetchAnime(id)}>
        <ChakraButton
          textAlign="center"
          textTransform="uppercase"
          fontWeight="bold"
          fontStyle="normal"
          fontSize="0.875rem"
          lineHeight="1rem"
          color="gray.500"
          bgColor="yellow.500"
          borderRadius="5px"
          py="10px"
          w="150px"
          h="40px"
          mt="2px"
          transition="0.2s"
          _hover={{
            border: "5px solid #F5DF4D",
            bgColor: "white",
            color: "yellow.500",
          }}
        >
          Go to Page
        </ChakraButton>
      </Link>
    </NextLink>
  );
}
