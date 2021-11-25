import { Box, Heading as ChakraHeading, Text, Flex } from "@chakra-ui/react";

export interface HeadingProps {
  episodes: number;
  title: string;
  year: number;
  score: number;
}

export default function Heading({
  episodes,
  title,
  year,
  score,
}: HeadingProps) {
  return (
    <Flex w="885px" justifyContent="space-between" as="section">
      <Box>
        <Flex>
          <ChakraHeading
            as="h1"
            fontSize="30px"
            fontWeight="bold"
            lineHeight="35px"
            fontStyle="normal"
            color="black"
            maxW="442.5px"
          >
            {title}
          </ChakraHeading>

          <Text
            fontSize="30px"
            fontWeight="normal"
            lineHeight="35px"
            color="black"
            ml="15px"
          >
            ({year})
          </Text>
        </Flex>
        <Text
          fontWeight="normal"
          fontStyle="normal"
          fontSize="22px"
          lineHeight="26px"
          color="black"
          mt="10px"
        >
          Episodes: {episodes}
        </Text>
      </Box>
      <Box w="65px" textAlign="center">
        <Text
          bgColor="yellow.500"
          color="gray.500"
          h="30px"
          textTransform="uppercase"
          fontSize="18px"
          fontWeight="bold"
          fontStyle="normal"
          lineHeight="21px"
          borderRadius="5px"
          pt="5px"
        >
          Score
        </Text>
        <Text fontWeight="bold" fontSize="28px" lineHeight="30px">
          {score}
        </Text>
      </Box>
    </Flex>
  );
}
