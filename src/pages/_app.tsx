import { useEffect, useState } from 'react'
import { Hydrate, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SelectProvider } from 'hooks/useSearch'
import type { AppProps } from 'next/app'

import { isDevEnvironment } from 'utils'

import '@fontsource/nova-mono'

import { Footer, Header } from '../components'
import { queryClient } from '../utils/common'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (!isDevEnvironment()) {
      import('mocks').then(({ setupMocks }) => {
        setupMocks().then(() => setShouldRender(true))
      })
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
