import { useEffect, useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SelectProvider } from 'hooks/useSearch'
import { makeServer } from 'mocks/miraje'
import type { AppProps } from 'next/app'

import { isDevEnvironment } from 'utils'

import '@fontsource/nova-mono'

import { Footer, Header } from '../components'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '../styles/tailwind.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isDevEnvironment()) {
      makeServer()
      setShouldRender(true)
    } else setShouldRender(true)
  }, [])

  if (!shouldRender) return null

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SelectProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </SelectProvider>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
