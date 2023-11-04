/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import Home from './Home';

function App(): JSX.Element {
  const client = new ApolloClient({
    uri: 'https://flyby-router-demo.herokuapp.com/',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <Home />
      </SafeAreaView>
    </ApolloProvider>
  );
}

export default App;
