import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
