import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import Config from '~/src/services/config';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://form-me.herokuapp.com/v1/graphql',
    headers: {
      'x-hasura-admin-secret': Config.HASURA_ACCESS_TOKEN,
    },
    // uri: 'https://48p1r2roz4.sse.codesandbox.io',
  }),
});

export default client;
