import React from 'react';
import Label from '~/src/components/Form/Label';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Label value={'test link'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
