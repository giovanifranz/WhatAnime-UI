import { Hydrate, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'
import { SelectProvider } from 'hooks/useSearch'
import type { AppProps } from 'next/app'

import '@fontsource/nova-mono'

import { Footer, Header } from '../components'
import { theme } from '../styles/theme'
import { queryClient } from '../utils/common'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SelectProvider>
          <ChakraProvider theme={theme}>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </ChakraProvider>
        </SelectProvider>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
