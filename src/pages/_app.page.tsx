import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import '@fontsource/nova-mono'

import { Footer, Header } from '../components'
import { theme } from '../styles/theme'
import { queryClient } from '../utils/common'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
