import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import _ from 'lodash';
import { Form, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';

import Config from 'final-form-react-native/services/config';
import Input from 'final-form-react-native/components/Form/Input';
import FieldGroup from 'final-form-react-native/components/Form/FieldGroup';
import FormButton from 'final-form-react-native/components/Form/FormButton';

const { Colors } = Config;
const required = (value) => (value ? undefined : 'required');

const Buildable = (props) => {
  const { fields = {}, onSubmit } = props;
  const [inputs, setInputs] = useState(fields);

  useEffect(() => {
    setInputs(fields || {});
  }, [fields]);

  return (
    <>
      <Form
        onSubmit={onSubmit}
        subscription={{ submitting: true, values: true }}
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
                  initialValue={inputs.form_name}>
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
                  placeholder="Enter a description for your form..."
                  initialValue={inputs.form_description}>
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
                  <FieldArray name="fields" initialValue={inputs.fields}>
                    {({ fields }) =>
                      fields.map((name, index) => (
                        <View style={styles.section} key={name}>
                          <FieldGroup
                            name={name}
                            placeholder={_.get(values, `${name}.placeholder`)}
                          />
                        </View>
                      ))
                    }
                  </FieldArray>
                </SafeAreaView>
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
