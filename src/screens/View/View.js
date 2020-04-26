import React from 'react';
import { Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import Fill from './components/Fill';
import Logger from '~/src/services/Logger';

const PROFILE = gql`
  query forms {
    forms: form {
      id
      name
      description
      fields {
        type
        label
        name
        required
        description
        id
      }
    }
  }
`;

function View() {
  const { loading, error, data } = useQuery(PROFILE);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return (
    <Fill fields={data.forms[0]} onSubmit={(v) => Logger.log('values', v)} />
  );
}

export default View;
