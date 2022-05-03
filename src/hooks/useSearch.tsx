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

import { getAnimesByTitleOnJikan } from 'utils/http/jikan/jikan-resource'

interface SelectContextType {
  select: TSelect
  setSelect: Dispatch<SetStateAction<TSelect>>
  payload: string
  setPayload: Dispatch<SetStateAction<string>>
  handleSubmit: () => void
  animes?: IAnime[]
  error?: Error
  isLoading: boolean
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
  error: undefined,
  isLoading: false,
}

const SelectContext = createContext<SelectContextType>(initialState)
const useSelect = () => useContext(SelectContext)

function SelectProvider({ children }: SelectProviderProps) {
  const [select, setSelect] = useState<TSelect>('word')
  const [payload, setPayload] = useState<string>('')
  const [animes, setAnimes] = useState<IAnime[] | undefined>()
  const [error, setError] = useState<Error>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = useCallback(async () => {
    if (select === 'word') {
      if (payload.length < 3 || payload.trim() === '') {
        return
      }
      setIsLoading(true)
      getAnimesByTitleOnJikan(payload)
        .then((response) => setAnimes(response))
        .catch((err: Error) => setError(err))
        .finally(() => setIsLoading(false))
    }
  }, [payload, select])

  const context: SelectContextType = useMemo(
    (): SelectContextType => ({
      select,
      setSelect,
      payload,
      setPayload,
      handleSubmit,
      animes,
      error,
      isLoading,
    }),
    [select, setSelect, payload, setPayload, handleSubmit, animes, error, isLoading],
  )

  return <SelectContext.Provider value={context}>{children}</SelectContext.Provider>
}

export { SelectContext, SelectProvider, useSelect }
