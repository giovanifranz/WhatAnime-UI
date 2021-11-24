import { Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import LogoHighlanderTech from '../../assets/LogoHighlander.png'
export default function HighlanderTech() {
  return (
    <>
      <Text
        mt="40px"
        fontFamily="Nova Mono"
        fontSize="1.25rem"
        color="white"
        textTransform="uppercase"
      >
        Designed By
      </Text>
      <Link href="https://www.highlandertech.com.br/">
        <Image
          src={LogoHighlanderTech}
          alt="Logo HighlanderTech"
          width={260}
          height={65}
        />
      </Link>
    </>
  );
}
