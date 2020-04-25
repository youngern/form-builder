import React from 'react';
import AddField from 'final-form-react-native/src/components/Form/AddField';
import renderer from 'react-test-renderer';

it('renders correctly with initial values', () => {
  const tree = renderer
    .create(
      <AddField
        values={{ initialValue: 'nada', fieldIndex: 0 }}
        onAdd={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly without initial values', () => {
  const tree = renderer
    .create(<AddField values={undefined} onAdd={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
