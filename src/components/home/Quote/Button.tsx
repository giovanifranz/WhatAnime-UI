import { IconButton } from "@chakra-ui/react";
import { HiArrowRight } from "react-icons/hi";
import { handlePerfetchAnime } from "../../../utils/handlePerfetchAnime";
import { useRouter } from "next/router";
export interface ButtonQuoteProps {
  id: number;
}

export default function Button({ id }: ButtonQuoteProps) {
  const router = useRouter();
  return (
    <IconButton
      onMouseEnter={() => handlePerfetchAnime(id)}
      onClick={() => router.push(`/${id}`)}
      aria-label="search-database"
      h="40px"
      w="40px"
      p="0px"
      bgColor="grey.100"
      color="#959A9C"
      bgRepeat="no-repeat"
      transition="0.5s"
      icon={<HiArrowRight />}
      _hover={{
        bgColor: "#959A9C",
        color: "#F5DF4D",
      }}
    />
  );
}
