import React from 'react'
import { AppProps } from 'next/app'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
