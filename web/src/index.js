import React from 'react';
import ReactDOM from 'react-dom';
import { 
    ApolloClient, 
    createHttpLink,
    InMemoryCache
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const url = process.env.API_URL || "http://localhost:4000/api";
const httpLink = createHttpLink({ uri: url });
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});
const link = ApolloLink.from([errorLink, httpLink]);
const cache = new InMemoryCache();


const client = new ApolloClient({
  ssrMode: true,
  link: link,
  cache,
  connectToDevTools: true
});

ReactDOM.render(
  <React.StrictMode>
    <App client={client}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//reportWebVitals(console.log);
