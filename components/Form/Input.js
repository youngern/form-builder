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
    <>
      <TextInput
        {...rest}
        ref={ref}
        style={[styles.textInput, error && styles.error]}
      />
      <View style={{ height: 25, marginLeft: 10 }}>
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </View>
    </>
  )
});

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  textInput: {
    paddingRight: 5,
    paddingLeft: 10,
    paddingVertical: 10,
    margin: 5,
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },

  error: {
    borderColor: '#f1a7a7',
  },
});

export default Input;
