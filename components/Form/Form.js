/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import { Form, Field } from 'react-final-form'
import { Colors } from 'react-native/Libraries/NewAppScreen';

import Input from './Input';
import FormButton from './FormButton';

const onSubmit = values => { console.log('values', values); }

const inputs = [
  {
    name: 'firstName',
    placeholder: 'First Name',
  },
  {
    name: 'lastName',
    placeholder: 'Last Name',
  },
]

const App: () => React$Node = () => {
  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'Required'
    }

    if (!values.lastName) {
      errors.lastName = 'Required'
    }

    if (!values.color) {
      errors.color = 'Required'
    }

    return errors;
  };


  return (
    <Form
     onSubmit={onSubmit}
     validate={validate}
    >
      {({ handleSubmit, form }) => (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <SafeAreaView>
              {inputs.map(props => {
                const { name } = props;

                return (
                  <Field
                    key={name}
                    {...props}
                  >
                    {({ input, meta, ...rest }) => {
                      const error = (meta.touched && meta.error) || undefined;

                      return (
                        <Input error={error} {...input} {...rest} />
                      )
                    }}
                  </Field>
                )
              })}
            </SafeAreaView>
          </ScrollView>
          <View style={styles.footer}>
            <FormButton
              label="Submit"
              onPress={handleSubmit}
              style={styles.submit}
            />
            <FormButton
              label="Reset"
              labelStyle={{ color: 'black' }}
              onPress={() => { form.reset(); }}
              style={styles.reset}
            />
          </View>
        </View>
      )}
    </Form>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  footer: {
    backgroundColor: Colors.lighter,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 25,
  },

  submit: {
    backgroundColor: '#7a7aff',
    borderColor: '#7a7aff'
  },
  reset: {
    backgroundColor: '#ededed',
  },
});

export default App;
