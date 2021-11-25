import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function BackToSearch() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/")}
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
  );
}
