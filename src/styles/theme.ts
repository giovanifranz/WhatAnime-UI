import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      ['100']: '#E5E5E5',

      ['500']: '#959A9C',
    },
    yellow: {
      ['500']: '#F5DF4D',
    },
    red: {
      ['500']: '#f2594E',
    },
  },
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Roboto, sans-serif',
  },
  styles: {
    global: {
      body: {
        bgColor: 'gray.100',
      },
      header: {
        bgColor: 'gray.500',
      },
      footer: {
        bgColor: 'gray.500',
      },
    },
  },
})
