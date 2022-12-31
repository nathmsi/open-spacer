import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_BASE_URL_HASURA}/v1/graphql`,
})

const authLink = setContext((_, { headers }) => {
  //   const authToken = localStorage.getItem('token')
  // const res = Cookies.get('token')
  // const accessToken = store?.getState()?.app?.accessToken;
  return {
    headers: {
      ...headers,
      //   ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  }
})

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
})
