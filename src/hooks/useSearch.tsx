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
import { QueryClient } from 'react-query'
import { IAnime } from 'types/anime'

import { getAnimesByTitleOnJikan } from 'utils/http/jikan'

interface SelectContextType {
  select: TSelect
  setSelect: Dispatch<SetStateAction<TSelect>>
  payload: string
  setPayload: Dispatch<SetStateAction<string>>
  handleSubmit: () => void
  results?: IAnime[]
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
  results: undefined,
  error: undefined,
  isLoading: false,
}

const SelectContext = createContext<SelectContextType>(initialState)
const useSelect = () => useContext(SelectContext)

function SelectProvider({ children }: SelectProviderProps) {
  const [select, setSelect] = useState<TSelect>('word')
  const [payload, setPayload] = useState<string>('')
  const [results, setResults] = useState<IAnime[] | undefined>()
  const [error, setError] = useState<Error>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = useCallback(async () => {
    if (select === 'word') {
      if (payload.length < 3 || payload.trim() === '') {
        return
      }

      setError(undefined)
      setIsLoading(true)

      new QueryClient().prefetchQuery('anime-by-title', async () =>
        getAnimesByTitleOnJikan(payload)
          .then((response) => setResults(response))
          .catch((err: Error) => setError(err))
          .finally(() => setIsLoading(false)),
      )
    }
  }, [payload, select])

  const context: SelectContextType = useMemo(
    (): SelectContextType => ({
      select,
      setSelect,
      payload,
      setPayload,
      handleSubmit,
      results,
      error,
      isLoading,
    }),
    [select, setSelect, payload, setPayload, handleSubmit, results, error, isLoading],
  )

  return <SelectContext.Provider value={context}>{children}</SelectContext.Provider>
}

export { SelectContext, SelectProvider, useSelect }
