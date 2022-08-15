import React from 'react';
import { ApolloProvider } from '@apollo/client';

import Pages from './pages';

import './App.css';

const App = props => {
  return (
    <ApolloProvider className="App" client={props.client}>
      <Pages />
    </ApolloProvider>
    );
}

export default App;
