/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useField } from 'react-final-form';
import Config from '~/src/services/config';

const { Fonts } = Config;

const Error = ({ name }) => {
  const {
    meta: { touched, error },
  } = useField(name, { subscription: { touched: true, error: true } });
  return (
    <View style={{ height: 14 }}>
      {touched && error ? (
        <Text
          style={{
            paddingLeft: 10,
            color: '#d63447',
            fontSize: 14,
            fontFamily: Fonts.Regular,
          }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default Error;
