import 'react-native';
import React from 'react'
import Registration from '../app/registration.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Registration />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
