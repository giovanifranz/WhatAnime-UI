import { IconButton, Link, Box } from "@chakra-ui/react";
import { HiArrowRight } from "react-icons/hi";
import NextLink from "next/link";
import { handlePerfetchAnime } from "../../../utils/handlePerfetchAnime";

export interface ButtonQuoteProps {
  id: number;
}

export default function Button({ id }: ButtonQuoteProps) {
  return (
    <Box h="50px" pt="15px">
      <NextLink href={`/${id}`}>
        <Link onMouseEnter={() => handlePerfetchAnime(id)}>
          <IconButton
            aria-label="search-database"
            h="35px"
            w="35px"
            p="0px"
            bgColor="grey.100"
            color="#959A9C"
            bgRepeat="no-repeat"
            transition="0.7s"
            icon={<HiArrowRight />}
            _hover={{
              bgColor: "#959A9C",
              color: "#F5DF4D",
            }}
          />
        </Link>
      </NextLink>
    </Box>
  );
}
