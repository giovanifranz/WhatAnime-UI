import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import Footer from '../components/Footer'
import Header from '../components/Header'
import { SearchProvider } from '../hooks/useSearch'
import { theme } from '../styles/theme'
import { queryClient } from '../utils/queryClient'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SearchProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </SearchProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
