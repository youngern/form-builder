import React from 'react';
import { Text, StyleSheet } from 'react-native';
import _ from 'lodash';
import Config from 'final-form-react-native/services/config';
const { Fonts } = Config;

const Label = ({ value }) => (
  <Text style={styles.label}>{_.upperCase(value)}</Text>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#4d80e4',
    fontFamily: Fonts.Bold,
  },
});

export default Label;
