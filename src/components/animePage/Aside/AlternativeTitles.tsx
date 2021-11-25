import { Box, Heading, Text, Stack } from "@chakra-ui/react";

export interface AlternativeTitlesProps {
  english?: string;
  japanese?: string;
}

export default function AlternativeTitles({
  english,
  japanese,
}: AlternativeTitlesProps) {
  return (
    <Box as="section">
      <Heading
        as="h3"
        fontSize="20px"
        fontWeight="bold"
        lineHeight="23px"
        mt="40px"
      >
        Alternative Titles:
      </Heading>
      <Stack
        as="section"
        lineHeight="16px"
        fontSize="14px"
        mt="10px"
        fontWeight="normal"
      >
        {english && (
          <Text>
            <strong>English: </strong>
            {english}
          </Text>
        )}
        {japanese && (
          <Text>
            <strong>Japanese: </strong>
            {japanese}
          </Text>
        )}
      </Stack>
    </Box>
  );
}
