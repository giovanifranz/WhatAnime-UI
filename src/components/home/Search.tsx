import { ChangeEvent, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { MdSmsFailed } from 'react-icons/md'
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
} from '@chakra-ui/react'

import { Heading } from '.'

type TSelect = 'word' | 'image'

const placeholder = {
  word: 'Enter your search key word',
  image: 'or enter image URL to search',
}

export function Search() {
  const [select, setSelect] = useState<TSelect>('word')
  const isLoading = false
  const error = false

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'word') {
      setSelect('word')
    } else {
      setSelect('image')
    }
  }
  return (
    <Box w="65%">
      <Flex alignItems="center">
        <Heading title="Search" />
        <Select
          w="150px"
          fontWeight="normal"
          fontSize="lg"
          textTransform="uppercase"
          onChange={(event) => handleChange(event)}
        >
          <option value="word">by word</option>
          <option value="image">by image</option>
        </Select>
        {isLoading && <Spinner ml="10px" color="yellow.500" />}
      </Flex>
      <InputGroup bgColor="white">
        <Input fontSize="xl" isTruncated isRequired placeholder={placeholder[select]} pr="70px" />
        <InputRightElement
          border=" 1px solid rgba(0, 0, 0, 0.3)"
          as={IconButton}
          icon={<HiOutlineSearch />}
          type="submit"
          fontSize="25px"
          transition="filter 0.2s"
          _hover={{
            filter: 'brightness(90%)',
          }}
          onClick={() => null}
        />
      </InputGroup>
      {error && (
        <Flex color="red.500" alignItems="center" w="155px" justifyContent="space-between" mt="5px">
          <Icon as={MdSmsFailed} fontSize="24px" />
          <span>Anime not found.</span>
        </Flex>
      )}
    </Box>
  )
}
