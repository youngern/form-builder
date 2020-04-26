import React from 'react';
import { Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import Form from '~/src/components/Form';

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

function Edit() {
  const { loading, error, data } = useQuery(PROFILE);
  const setValues = async (values) => {
    // this.setState({ loading: true, fields: values });
    // await api.set(values);
    Logger.log('set values', values);
    // this.setState({ loading: false });
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return <Form fields={data.forms[0]} onSubmit={setValues} />;
}

export default Edit;
