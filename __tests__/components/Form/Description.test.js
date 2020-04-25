import React from 'react';
import Description from 'final-form-react-native/src/components/Form/Description';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Description value={'test link'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
