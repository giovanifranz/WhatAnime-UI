import { ChangeEvent, MouseEvent, startTransition } from 'react'
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
import { useSelect } from 'hooks/useSearch'

import { Title } from '.'

const placeholder = {
  word: 'Enter your search key word',
  image: 'or enter image URL to search',
}

export function Search() {
  const { select, setSelect, handleSubmit, payload, setPayload, error, isLoading } = useSelect()

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === 'word') {
      setSelect('word')
    } else {
      setSelect('image')
    }
  }

  function handleClick(event: MouseEvent) {
    event.preventDefault()
    startTransition(() => handleSubmit())
  }

  return (
    <Box w={['100%', '65%']}>
      <Flex alignItems="center">
        <Title text="Search" />
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
      <InputGroup as="form" bgColor="white">
        <Input
          fontSize="xl"
          isTruncated
          placeholder={placeholder[select]}
          pr="70px"
          onChange={(event) => setPayload(event.target.value)}
          isRequired
        />
        <InputRightElement
          border=" 1px solid rgba(0, 0, 0, 0.3)"
          as={IconButton}
          icon={<HiOutlineSearch />}
          type="submit"
          fontSize="25px"
          transition="filter 0.2s"
          isDisabled={payload.length <= 3}
          _hover={{
            filter: 'brightness(90%)',
          }}
          onClick={(event: MouseEvent) => handleClick(event)}
        />
      </InputGroup>
      {error && (
        <Flex color="red.500" alignItems="center" w="155px" justifyContent="space-between" mt="5px">
          <Icon as={MdSmsFailed} fontSize="24px" />
          <span>{error.message}</span>
        </Flex>
      )}
    </Box>
  )
}
