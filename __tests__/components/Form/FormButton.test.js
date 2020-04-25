import React from 'react';
import FormButton from '~/src/components/Form/FormButton';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <FormButton
        label="Add Field"
        onPress={() => {}}
        style={{
          backgroundColor: '#fbfefd',
          borderColor: '#679b9b',
          borderWidth: 2,
        }}
        labelStyle={{ fontSize: 20, color: '#679b9b' }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly without any styling', () => {
  const tree = renderer
    .create(<FormButton label="Add Field" onPress={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
