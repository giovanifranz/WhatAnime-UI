import { Link, Button } from "@chakra-ui/react";
import NextLink from "next/link";

export default function BackToSearch() {
  return (
    <NextLink href="/">
      <Link _hover={{ textDecoration: "none" }}>
        <Button
          textAlign="center"
          textTransform="uppercase"
          fontWeight="bold"
          fontStyle="normal"
          fontSize="26px"
          lineHeight="30px"
          color="gray.500"
          bgColor="yellow.500"
          borderRadius="10px"
          py="10px"
          w="310px"
          h="50px"
          transition="0.7s"
          _hover={{
            border: "5px solid #F5DF4D",
            bgColor: "gray.100",
            color: "yellow.500",
          }}
        >
          Back to Search
        </Button>
      </Link>
    </NextLink>
  );
}
