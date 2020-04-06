import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const FormButton = ({ label, style, labelStyle = {}, ...props }) => (
  <TouchableOpacity style={[styles.button, style]} {...props}>
    <Text style={[styles.buttonText, labelStyle]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    flex: 1,
    margin: 10,
    borderRadius: 5,
    borderColor: 'lightgray',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },

  buttonText: {
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default FormButton;
