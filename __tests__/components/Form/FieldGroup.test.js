import React from 'react';
import { Form } from 'react-final-form';
import FieldGroup from '~/src/components/Form/FieldGroup';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Form onSubmit={() => {}}>
        {() => <FieldGroup name="fields[0]" placeholder="placeholder" />}
      </Form>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
