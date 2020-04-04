/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Input = React.forwardRef((props, ref) => {
  const { checked, name, error, ...rest } = props;
  return (
    <TextInput
      {...rest}
      ref={ref}
      style={[styles.textInput, error && styles.error]}
    />
  )
});

const styles = StyleSheet.create({
  textInput: {
    paddingRight: 5,
    paddingLeft: 10,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#fbfefd',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    color: '#204051',
    fontSize: 20,
    fontFamily: 'AppleSDGothicNeo-Bold'
  },

  error: {
    borderColor: '#d63447',
  },

  errorText: {
    color: '#d63447',
    fontSize: 14,
    fontFamily: 'AppleSDGothicNeo-Regular'
  },
});

export default Input;
