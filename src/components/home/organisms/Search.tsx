import { ChangeEvent, MouseEvent, startTransition } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { MdSmsFailed } from 'react-icons/md'
import { useSelect } from 'hooks/useSearch'

import { Loading } from 'components/common/atoms'

import { Title } from '../atoms/Title'

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
    <section className="w-full lg:h-40 lg:w-2/3">
      <div className="flex items-center gap-3">
        <Title text="Search" />
        <select className="text-lg uppercase bg-transparent" onChange={(event) => handleChangeSelect(event)}>
          <option value="word">by word</option>
          {/* <option value="image">by image</option> */}
        </select>
        {isLoading && <Loading />}
      </div>
      <form className="flex w-full">
        <input
          className="w-full h-12 p-2 bg-white border border-r-0 border-solid rounded-l font-xl line-clamp-1 border-zinc-400"
          placeholder={placeholder[select]}
          onChange={(event) => setPayload(event.target.value)}
        />
        <button
          type="submit"
          className="right-0 w-12 h-12 p-1 text-black border border-black border-solid rounded-r bg-zinc-100 transition-opacity hover:opacity-60"
          onClick={(event: MouseEvent) => handleClick(event)}
        >
          <HiOutlineSearch size="40px" />
        </button>
      </form>
      {error && (
        <div className="flex w-full mt-2 items-left gap-2 text-red">
          <MdSmsFailed size="24px" />
          <span>{error.message}</span>
        </div>
      )}
    </section>
  )
}
