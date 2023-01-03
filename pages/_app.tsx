import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { clientWs } from '../src/utils/graphql'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={clientWs}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
