import {
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
  Select,
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState, ChangeEvent } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { MdSmsFailed } from "react-icons/md";
import { useSearch } from "../../hooks/useSearch";
import Heading from "./Heading";
enum SELECT {
  IMAGE = "IMAGE",
  WORD = "WORD",
}

export default function Search() {
  const selectWord = "Enter your search key word";
  const selectImage = "or enter image URL to search";
  const [searchPage, setSearchPage] = useState({
    placeholder: selectWord,
    type: "text",
  });

  const {
    setSelect,
    select,
    setPayload,
    payload,
    handleSubmit,
    isLoading,
    error,
  } = useSearch();

  useEffect(() => {
    if (select === "WORD") {
      setSearchPage({ placeholder: selectWord, type: "text" });
    } else {
      setSearchPage({ placeholder: selectImage, type: "url" });
    }
  }, [select]);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "word") {
      setSelect(SELECT.WORD);
    } else {
      setSelect(SELECT.IMAGE);
    }
  }
  return (
    <Box w="790px">
      <Flex alignItems="center" color="yellow.500">
        <Heading title="Search"/>
        <Select
          w="150px"
          fontWeight="normal"
          fontSize="1rem"
          lineHeight="1.25rem"
          textTransform="uppercase"
          color="black"
          onChange={handleChange}
        >
          <option value="word">by word</option>
          {
          //<option value="image">by image</option>
          }
        </Select>
        {isLoading && <Spinner ml="10px" color="yellow.500"/>}
      </Flex>
      <InputGroup bgColor="white">
        <Input
          fontSize="1.25rem"
          lineHeight="1.5rem"
          isTruncated
          id="anime"
          name="anime"
          onChange={(e) => setPayload(e.target.value)}
          value={payload}
          isRequired
          placeholder={searchPage.placeholder}
          pr="70px"
        />
        <InputRightElement
          border=" 1px solid rgba(0, 0, 0, 0.3)"
          h="100%"
          w="50px"
          as={IconButton}
          aria-label="Search database"
          type="submit"
          icon={<HiOutlineSearch />}
          transition="filter 0.2s"
          _hover={{
            bgColor: "gray.100",
            filter: "brightness(90%)",
          }}
          onClick={() => handleSubmit()}
        />
      </InputGroup>
      {error && (
          <Flex color="red.500" alignItems="center" w="155px" justifyContent="space-between" mt="5px">
            <MdSmsFailed size="24" />
            <span>Anime not found.</span>
          </Flex>
        )}
    </Box>
  );
}