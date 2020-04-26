import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import Config from '~/src/services/config';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: Config.API_URL,
    headers: {
      'x-hasura-admin-secret': Config.HASURA_ACCESS_TOKEN,
    },
  }),
});

export default client;
