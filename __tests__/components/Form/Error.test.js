import React from 'react';
import { Form } from 'react-final-form';
import Error from 'final-form-react-native/components/Form/Error';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Form onSubmit={() => {}}>{() => <Error name="name" />}</Form>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
