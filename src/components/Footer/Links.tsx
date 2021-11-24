import {
  Stack,
  Link as LinkChakra,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { SiMyanimelist, SiAnilist } from "react-icons/si";

interface HeadingProps {
  title: string;
}

interface LinkProps {
  icon: IconType;
  href: string;
}

function Link({ icon, href }: LinkProps) {
  return (
    <LinkChakra href={href}>
      <Button
        as={icon}
        w="50px"
        h="50px"
        borderRadius="8px"
        bgColor="gray.100"
        color="gray.500"
        p="5px"
        _hover={{
          bgColor: "yellow.500",
          color: "gray.800",
        }}
      />
    </LinkChakra>
  );
}

function Heading({ title }: HeadingProps) {
  return (
    <Text
      mt={["10px", "10px", "20px"]}
      fontFamily="Nova Mono"
      fontSize="20px"
      color="white"
      textTransform="uppercase"
    >
      {title}
    </Text>
  );
}

export default function Links() {
  return (
    <Stack as="section" spacing="20px">
      <Heading title="Connect" />
      <HStack w="110px" justifyContent="space-between" spacing="20px">
        <Link icon={SiAnilist} href="https://anilist.co" />
        <Link
          icon={SiMyanimelist}
          href="https://myanimelist.net/profile/HighlanderTech"
        />
      </HStack>
      <Heading title="Share" />
      <HStack w="110px" justifyContent="space-between" spacing="20px">
        <Link
          icon={AiFillFacebook}
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A//www.whatanime.org/"
        />
        <Link
          icon={AiOutlineTwitter}
          href="https://twitter.com/intent/tweet?text=https%3A//www.whatanime.org/"
        />
      </HStack>
    </Stack>
  );
}
