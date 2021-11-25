import { Box, Flex, Link, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Nextlink from "next/link";
import LogoWhatAnime from "../../assets/LogoWhatAnime.png";
import HighlanderTech from "./HighlanderTech";
import Paypal from "./Paypal";
import Links from "./Links";
export default function Footer() {
  return (
    <Box
      as="footer"
      minWidth={1050}
      w="100%"
      h="415px"
      px="0px"
      borderTop="1px solid black"
    >
      <Flex w="1105px" mx="auto">
        <Box w="425px">
          <Nextlink href="/">
            <Link
              display="flex"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Box my="15px">
                <Image
                  src={LogoWhatAnime}
                  width={80}
                  height={80}
                  alt="Logo WhatAnime"
                />
              </Box>

              <Heading
                as="h1"
                fontFamily="Nova Mono"
                fontWeight="normal"
                fontSize="45px"
                lineHeight="79%"
                w="152px"
                h="70px"
                color="yellow.500"
                my="20px"
                ml="10px"
                textTransform="uppercase"
              >
                What Anime?
              </Heading>
            </Link>
          </Nextlink>
          {
            //         <Links />
          }
        </Box>
        <Box mt="15px" borderLeft="1px solid black" pl="15px">
          <Flex>
            <Text
              fontSize="20px"
              fontWeight="200"
              lineHeight="23px"
              color="white"
              w="368px"
              m="24px 20px 0 0"
            >
              This site is our baby, so please consider donating if you are able
              so that we can keep working on it!
            </Text>
            {
              //          <Paypal />
            }
          </Flex>
          <Text
            fontStyle="normal"
            fontSize="1.25rem"
            fontWeight="500"
            lineHeight="1.5rem"
            color="white"
            textTransform="uppercase"
            mt="38px"
          >
            Legal
          </Text>

          <Text
            fontSize="20px"
            fontWeight="200"
            lineHeight="23px"
            color="white"
            w="685px"
            m="25px 25px 0 0"
          >
            All anime series names, images, and content are copyrighted content
            of their respective license holders. I do not own the rights to any
            of these anime series. Anime information compiled from AniList and
            MyAnimeList.
          </Text>
          <HighlanderTech />
        </Box>
      </Flex>
    </Box>
  );
}
