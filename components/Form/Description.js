import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Config from 'final-form-react-native/services/config';
const { Fonts } = Config;
const Description = ({ value }) => {
  return <Text style={styles.description}>{value.trim()}</Text>;
};

const styles = StyleSheet.create({
  description: {
    fontFamily: Fonts.regular,
    color: '#679b9b',
    fontSize: 12,
  },
});

export default Description;
