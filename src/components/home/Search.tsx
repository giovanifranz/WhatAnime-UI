import { ChangeEvent, MouseEvent, startTransition } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { MdSmsFailed } from 'react-icons/md'
import { useSelect } from 'hooks/useSearch'

import { Loading } from 'components/common'

import { Title } from '.'

const placeholder = {
  word: 'Enter your search key word',
  image: 'or enter image URL to search',
}

export function Search() {
  const { select, setSelect, handleSubmit, setPayload, error, isLoading } = useSelect()

  function handleChangeSelect(event: ChangeEvent<HTMLSelectElement>) {
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
    <section className="w-full lg:w-2/3">
      <div className="flex items-center">
        <Title text="Search" />
        <select
          className="w-40 text-lg uppercase bg-transparent"
          onChange={(event) => handleChangeSelect(event)}
        >
          <option value="word">by word</option>
          <option value="image">by image</option>
        </select>
        {isLoading && <Loading />}
      </div>
      <form className="flex w-full">
        <input
          className="font-xl line-clamp-1 p-2 h-12 w-full rounded-l border border-r-0 border-zinc-400 border-solid bg-white"
          placeholder={placeholder[select]}
          onChange={(event) => setPayload(event.target.value)}
        />
        <button
          type="submit"
          className="border border-black border-solid transition-opacity hover:opacity-60 right-0 w-12 h-12 p-1 rounded-r"
          onClick={(event: MouseEvent) => handleClick(event)}
        >
          <HiOutlineSearch size="40px" />
        </button>
      </form>
      {error && (
        <div className="flex items-left w-full gap-2 mt-2 text-red">
          <MdSmsFailed size="24px" />
          <span>{error.message}</span>
        </div>
      )}
    </section>
  )
}
