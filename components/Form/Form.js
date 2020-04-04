/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Form, Field, FormSpy, useField } from 'react-final-form';
// import createDecorator from 'final-form-focus';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// import arrayMutators from 'final-form-arrays'
// import { FieldArray } from 'react-final-form-arrays'

import Input from './Input';
import FormButton from './FormButton';
import fields from './schema.json';

const onSubmit = values => { console.log('keys', Object.keys(values)); }
// const validate = (values) => {
//   const errors = {};
//   inputs.forEach((fieldAttributes) => {
//     fieldAttributes.constraints.forEach((constraint) => {
//       if(constraint.required && !values[fieldAttributes.name]) {
//         errors[fieldAttributes.name] = constraint.message;
//       }
//     })
//   });

//   return errors;
// };
const Error = ({ name }) => {
  const {
    meta: { touched, error }
  } = useField(name, { subscription: { touched: true, error: true } });
  return (
    <View style={{ height: 14 }}>
      {touched && error ? (
        <Text style={{
          paddingLeft: 10,
          color: '#d63447',
          fontSize: 14,
          fontFamily: 'AppleSDGothicNeo-Regular'
          }}
        >
        {error}
        </Text>
      )
      : null}
    </View>
  );
};

const fieldParams = {
  "type": "input",
  "name": "phone_number",
  "placeholder": "Phone Number",
  "constraints": [
    {
      "required": true,
      "message": "Phone Number is Required"
    }
  ]
};

const App: () => React$Node = () => {
  const [inputs, setInputs] = useState(fields);
  const initialValues = inputs.reduce((values, curr) => ({ ...values, [curr.name]: curr.initialValue }), {})

  const addField = (input) => {
    const newInputs = [
      ...inputs,
      fieldParams,
    ]

    setInputs(newInputs);
  }

  // const validate = value => value ? undefined : 'required';

  const validate = () => undefined;

  return (
    <Form
     initialValues={initialValues}
     onSubmit={onSubmit}
     subscription={{ submitting: true }}
    >
      {({
        handleSubmit,
        form,
        // form: {
        //   mutators: { push, pop }
        // }, // injected from final-form-arrays above
        values,
        submitting,
      }) => (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.container}
          >
            <SafeAreaView>
              {inputs.map(props => {
                const { name } = props;

                return (
                  <Fragment key={name}>
                    <Field
                      key={name}
                      subscription={{ value: true, active: true, touched: true, error: true }}
                      validate={validate}
                      {...props}
                    >
                      {({ input, meta, ...rest }) => {
                        const error = (meta.touched && meta.error) || undefined;

                        return (
                          <Input
                            error={error}
                            {...input}
                            {...rest}
                          />
                        )
                      }}
                    </Field>
                    <Error name={name} />
                  </Fragment>
                )
              })}
              <FormButton
                label="Add Field"
                onPress={addField}
                style={styles.submit}
                labelStyle={{ fontSize: 20 }}
              />
            </SafeAreaView>
          </ScrollView>
          <View style={styles.spy}>
            <FormSpy subscription={{ values: true }}>
              {({ values }) => (
                <Text>{JSON.stringify(values, undefined, 2)}</Text>
              )}
            </FormSpy>
          </View>
          
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

const baseColor = '#f3fcf9';

const styles = StyleSheet.create({
  container: {
    backgroundColor: baseColor,
    flex: 1,
  },

  footer: {
    backgroundColor: baseColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 25,
  },

  spy: {
    backgroundColor: Colors.white,
    padding: 10,
    marginHorizontal: 10,
    borderColor: 'lightgray',
    borderRadius: 5,
    borderWidth: 1,
  },

  submit: {
    backgroundColor: '#4d80e4',
    borderColor: '#4d80e4'
  },

  reset: {
    backgroundColor: '#fbfefd',
    borderColor: '#46b3e6'
  },
});

export default App;
