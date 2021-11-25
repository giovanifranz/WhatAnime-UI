import { Box, Heading, Text as TextChakra } from "@chakra-ui/react";

export interface TextProps {
  synopsis: string;
}

export default function Text({ synopsis }: TextProps) {
  return (
    <Box as="article" color="black">
      <Heading
        as="h2"
        fontWeight="bold"
        fontSize="22px"
        lineHeight="26px"
        mt="30px"
      >
        Synopsis
        <Box bgColor="gray.500" w="210px" h="1px" />
      </Heading>
      <TextChakra
        mt="20px"
        fontSize="20px"
        fontWeight="normal"
        fontStyle="normal"
        lineHeight="23px"
        wordBreak="break-word"
        textAlign="justify"
      >
        {synopsis}
      </TextChakra>
    </Box>
  );
}
