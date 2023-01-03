import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: `wss://open-spacer.hasura.app/v1/graphql`,
          // connectionParams: {
          //   authToken: user.authToken,
          // },
        })
      )
    : null

const httpLink = new HttpLink({
  uri: `${'https://open-spacer.hasura.app'}/v1/graphql`,
})

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        wsLink,
        httpLink
      )
    : httpLink

export const clientWs = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
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
