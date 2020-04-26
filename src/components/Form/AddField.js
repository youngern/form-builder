import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Switch } from 'react-native';
import _ from 'lodash';
import { Form, Field } from 'react-final-form';

import Config from '~/src/services/config';
import Input from './Input';
import Error from './Error';
import Label from './Label';
import FormButton from './FormButton';

const { Colors } = Config;
const SwitchInput = React.forwardRef((props, ref) => {
  const { onChange, ...rest } = props;
  return (
    <View
      style={{
        paddingRight: 5,
        paddingVertical: 10,
        marginVertical: 5,
        alignItems: 'flex-start',
      }}>
      <Switch
        ref={ref}
        trackColor={{ false: '#edffea', true: '#75daad' }}
        thumbColor="#fff"
        ios_backgroundColor="#ed6663"
        onValueChange={onChange}
        {...rest}
      />
    </View>
  );
});

const required = (value) => (value ? undefined : 'required');
const App = (props) => {
  const { values = undefined, onAdd } = props;
  return (
    <Form onSubmit={onAdd} initialValues={values}>
      {({ handleSubmit }) => (
        <SafeAreaView style={{ flex: 1 }}>
          <View>
            <Text style={styles.fieldHeader}>Add Field</Text>
            <View style={styles.section}>
              <Label value="Label" />
              <Field
                subscription={{
                  value: true,
                  active: true,
                  touched: true,
                  error: true,
                }}
                name="label"
                placeholder="Label"
                validate={required}>
                {({ input, meta, ...rest }) => {
                  const error = (meta.touched && meta.error) || undefined;

                  return <Input error={error} {...input} {...rest} />;
                }}
              </Field>
              <Error name="label" />
            </View>
            <View style={styles.section}>
              <Label value="Description" />
              <Field
                subscription={{
                  value: true,
                  active: true,
                  touched: true,
                  error: true,
                }}
                name="description"
                placeholder="Description">
                {({ input, meta, ...rest }) => {
                  const error = (meta.touched && meta.error) || undefined;

                  return <Input error={error} {...input} {...rest} />;
                }}
              </Field>
            </View>
            <Error name="description" />
            <View style={styles.section}>
              <Label value="Placeholder" />
              <Field
                subscription={{
                  value: true,
                  active: true,
                  touched: true,
                  error: true,
                }}
                name="placeholder"
                placeholder="Placeholder">
                {({ input, meta, ...rest }) => {
                  const error = (meta.touched && meta.error) || undefined;

                  return <Input error={error} {...input} {...rest} />;
                }}
              </Field>
              <Error name="placeholder" />
            </View>
            <View style={styles.section}>
              <Label value="Initial Value" />
              <Field
                subscription={{
                  value: true,
                  active: true,
                  touched: true,
                  error: true,
                }}
                name="initialValue"
                placeholder="Initial Value">
                {({ input, meta, ...rest }) => {
                  const error = (meta.touched && meta.error) || undefined;

                  return <Input error={error} {...input} {...rest} />;
                }}
              </Field>
              <Error name="initialValue" />
            </View>
            <View style={styles.section}>
              <Label value="Required" />
              <Field
                subscription={{
                  value: true,
                  active: true,
                  touched: true,
                  error: true,
                }}
                name="required"
                placeholder="Required"
                initialValue={false}>
                {({ input, meta, ...rest }) => {
                  const error = (meta.touched && meta.error) || undefined;

                  return <SwitchInput error={error} {...input} {...rest} />;
                }}
              </Field>
              <Error name="required" />
            </View>
          </View>
          <FormButton
            label="Add Field"
            onPress={handleSubmit}
            style={[styles.submit, { flex: 0 }]}
            labelStyle={{ fontSize: 20 }}
          />
        </SafeAreaView>
      )}
    </Form>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },

  footer: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 25,
  },

  formHeader: {
    borderWidth: 0,
    backgroundColor: Colors.background,
    fontSize: 30,
    color: '#4d80e4',
    padding: 0,
    marginLeft: 0,
  },

  fieldHeader: {
    borderWidth: 0,
    fontSize: 30,
    color: '#4d80e4',
    padding: 0,
    marginLeft: 10,
    marginBottom: 10,
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
    borderColor: '#4d80e4',
  },

  reset: {
    backgroundColor: '#fbfefd',
    borderColor: '#46b3e6',
  },

  active: {
    borderColor: '#46b3e6',
  },

  section: {
    marginHorizontal: 10,
  },
});

export default App;
