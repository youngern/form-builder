import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Text,
} from 'react-native';
import _ from 'lodash';
import { Form, Field, FormSpy } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';

import Config from '~/src/services/config';
import Logger from '~/src/services/Logger';
import Input from '~/src/components/Form/Input';
import FormButton from '~/src/components/Form/FormButton';

import Question from './Question';

const { Colors } = Config;
const required = (value) => (value ? undefined : 'required');

const Buildable = (props) => {
  const { fields = {} } = props;
  const onSubmit = (values) => {
    Logger.log('save', values);
  };

  Logger.log('fields', fields);

  return (
    <>
      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators,
        }}>
        {({ handleSubmit, form, values }) => (
          <>
            <View style={styles.container}>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView>
                <Field
                  subscription={{
                    value: true,
                    active: true,
                    touched: true,
                    error: true,
                  }}
                  name="form_name"
                  placeholder="Form Name"
                  validate={required}
                  initialValue={fields.form_name}>
                  {({ input, meta, ...rest }) => {
                    const error = (meta.touched && meta.error) || undefined;

                    return (
                      <Input
                        editable={false}
                        accessible
                        accessibilityLabel="Form Name"
                        accessibilityHint="Navigates to the previous screen"
                        style={styles.formHeader}
                        selectionColor="#b7efcd"
                        error={error}
                        {...input}
                        {...rest}
                      />
                    );
                  }}
                </Field>
                <Field
                  subscription={{
                    value: true,
                    active: true,
                    touched: true,
                    error: true,
                  }}
                  name="form_description"
                  initialValue={fields.form_description}>
                  {({ input, meta, ...rest }) => {
                    const error = (meta.touched && meta.error) || undefined;

                    return (
                      <Input
                        editable={false}
                        editing={false}
                        accessible
                        accessibilityLabel="Form Description"
                        accessibilityHint="Navigates to the previous screen"
                        style={styles.formDescription}
                        selectionColor="#b7efcd"
                        error={error}
                        {...input}
                        {...rest}
                      />
                    );
                  }}
                </Field>
              </SafeAreaView>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={[styles.container, { paddingTop: 10 }]}>
                <SafeAreaView>
                  <FieldArray name="fields" initialValue={fields.fields}>
                    {({ fields }) =>
                      fields.map((name) => (
                        <View style={styles.section} key={name}>
                          <Question
                            name={name}
                            placeholder={_.get(values, `${name}.placeholder`)}
                          />
                        </View>
                      ))
                    }
                  </FieldArray>
                </SafeAreaView>
                <FormSpy subscription={{ values: true }}>
                  {({ values }) => <Text>{JSON.stringify(values, 0, 2)}</Text>}
                </FormSpy>
              </ScrollView>
              <View style={styles.footer}>
                <FormButton
                  label="Save"
                  onPress={handleSubmit}
                  style={styles.submit}
                />
              </View>
            </View>
          </>
        )}
      </Form>
    </>
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

  formDescription: {
    borderWidth: 0,
    backgroundColor: Colors.background,
    fontSize: 14,
    color: '#4d80e4',
    padding: 0,
    paddingTop: 0,
    marginLeft: 0,
  },

  fieldButton: {
    backgroundColor: '#fbfefd',
    borderColor: '#679b9b',
    borderWidth: 2,
    flex: 0,
  },

  fieldHeader: {
    borderWidth: 0,
    fontSize: 30,
    color: '#4d80e4',
    padding: 0,
    marginLeft: 10,
    marginBottom: 10,
  },

  submit: {
    backgroundColor: '#4d80e4',
    borderColor: '#4d80e4',
  },

  section: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

export default Buildable;
