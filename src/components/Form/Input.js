/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Config from 'final-form-react-native/src/services/config';

const { Fonts } = Config;

const Input = React.forwardRef((props, ref) => {
  const { checked, name, error, style, onFocus, ...rest } = props;

  return (
    <TextInput
      {...rest}
      ref={ref}
      style={[styles.textInput, style, error && styles.error]}
    />
  );
});

const styles = StyleSheet.create({
  textInput: {
    paddingRight: 5,
    paddingLeft: 10,
    paddingVertical: 10,
    backgroundColor: '#fbfefd',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    color: '#204051',
    fontSize: 20,
    fontFamily: Fonts.Bold,
  },

  error: {
    borderColor: '#d63447',
  },

  errorText: {
    color: '#d63447',
    fontSize: 14,
    fontFamily: Fonts.Regular,
  },
});

export default Input;
