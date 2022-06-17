import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Colors } from '../theme/appTheme'

function MyApp({ Component, pageProps }: AppProps) {

  const theme = extendTheme({Colors})

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
