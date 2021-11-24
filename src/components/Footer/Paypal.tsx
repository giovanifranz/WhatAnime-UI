import { Link, Button } from "@chakra-ui/react";
import { SiPaypal } from "react-icons/si";

export default function Paypal() {
  return (
    <Link
      href="https://www.paypal.com/donate/?hosted_button_id=KJ9TK628E7N42"
      w="74px"
      h="74px"
      mt="20.5px"
    >
      <Button
        as={SiPaypal}
        w="74px"
        h="74px"
        bgColor="gray.100"
        color="gray.500"
        borderRadius="50%"
        _hover={{
          bgColor: "yellow.500",
          color: "gray.800",
        }}
      />
    </Link>
  );
}
