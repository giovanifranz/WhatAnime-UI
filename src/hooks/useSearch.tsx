import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { IAnime } from 'types/anime'

import { formatSlug, queryClient } from 'utils/common'
import { getAnimesByTitleOnJikan } from 'utils/http/jikan/jikan-resource'

interface SelectContextType {
  select: TSelect
  setSelect: Dispatch<SetStateAction<TSelect>>
  payload: string
  setPayload: Dispatch<SetStateAction<string>>
  handleSubmit: () => void
  animes: IAnime[] | undefined
}

interface SelectProviderProps {
  children: ReactNode
}

const initialState: SelectContextType = {
  select: 'word',
  setSelect: () => null,
  payload: '',
  setPayload: () => null,
  handleSubmit: () => null,
  animes: undefined,
}

const SelectContext = createContext<SelectContextType>(initialState)
const useSelect = () => useContext(SelectContext)

function SelectProvider({ children }: SelectProviderProps) {
  const [select, setSelect] = useState<TSelect>('word')
  const [payload, setPayload] = useState<string>('')
  const [animes, setAnimes] = useState<IAnime[] | undefined>()

  const handleSubmit = useCallback(async () => {
    if (select === 'word') {
      if (payload.length < 3 || payload.trim() === '') {
        return
      }
      const data = await queryClient.fetchQuery(['anime-by-title', formatSlug(payload)], async () =>
        getAnimesByTitleOnJikan(payload),
      )
      setAnimes(data)
    }
  }, [payload, select])

  const value = useMemo(
    () => ({ select, setSelect, payload, setPayload, handleSubmit, animes }),
    [select, setSelect, payload, setPayload, handleSubmit, animes],
  )

  return <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
}

export { SelectContext, SelectProvider, useSelect }
