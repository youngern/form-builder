import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import { Form, Field, FormSpy } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

import Config from 'FinalFormReactNative/services/config';
import Input from './Input';
import Description from './Description';
import Label from './Label';
import AddField from './AddField';
import FormButton from './FormButton';
import Modal from '../Modal';

const { Colors } = Config;
const required = (value) => value ? undefined : 'required';

const Buildable = (props) => {
  const { fields = [], onSubmit } = props;
  const [inputs, setInputs] = useState(fields);
  const [fieldValues, setFieldValues] = useState(undefined);
  useEffect(() => { setInputs(fields); }, [fields])
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Form
        onSubmit={onSubmit}
        subscription={{ submitting: true, values: true }}
        mutators={{
          ...arrayMutators
        }}
      >
        {({ handleSubmit, form, values }) => (
          <>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <Field
                subscription={{ value: true, active: true, touched: true, error: true }}
                name="form_name"
                placeholder="Form Name"
                validate={required}
                initialValue={inputs.form_name}
              >
                {({ input, meta, ...rest }) => {
                  const error = (meta.touched && meta.error) || undefined;

                  return (
                    <Input
                      style={styles.formHeader}
                      selectionColor="#b7efcd"
                      error={error}
                      {...input}
                      {...rest}
                    />
                  )
                }}
              </Field>
            </SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={[styles.container, { paddingTop: 10 }]}
            >
              <SafeAreaView>
                <FieldArray name="fields" initialValue={inputs.fields}>
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <TouchableOpacity
                        onPress={() => {
                          const currentFieldValues = _.get(inputs, name);
                          setFieldValues({ ...currentFieldValues, fieldIndex: index });
                          setModalVisible(true);
                        }}
                        style={styles.section}
                        key={name}
                      >
                        <Field name={`${name}.name`}>
                          {({ input }) => <Label {...input} />}
                        </Field>
                        <Field name={`${name}.description`}>
                          {({ input }) => <Description {...input} />}
                        </Field>
                        <Field name={`${name}.initialValue`} placeholder={_.get(values, `${name}.placeholder`)}>
                          {({ input, meta, ...rest }) => {
                            return (
                              <Input
                                {...input}
                                {...rest}
                              />
                            )
                          }}
                        </Field>
                        {/* <Field
                          key={`${name}.${fieldName}`}
                          subscription={{ value: true, active: true, touched: true, error: true }}
                          name={`${name}.${fieldName}`}
                        >
                          {({ input, meta, ...rest }) => {
                            const error = (meta.touched && meta.error) || undefined;
                            return (
                              <Input
                                style={meta.active ? styles.active : {}}
                                error={error}
                                {...input}
                                {...rest}
                                name={`${name}.${fieldName}`}
                              />
                            )
                          }}
                        </Field> */}
                        {/* <Error name={name} /> */}
                      </TouchableOpacity>
                    ))
                  }
                </FieldArray>
                <FormButton
                  label="Add Field"
                  onPress={() => { setModalVisible(true); }}
                  style={styles.fieldButton}
                  labelStyle={{ fontSize: 20, color: '#679b9b' }}
                />
              </SafeAreaView>
            </ScrollView>
            {/* <FormSpy subscription={{ values: true }}>
              {({ values }) => {
                console.log('values', values);
                return (
                  <Text>
                    {JSON.stringify(values, 0, 2)}
                  </Text> 
                );
              }}
            </FormSpy> */}
            <View style={styles.footer}>
              <FormButton
                label="Save"
                onPress={handleSubmit}
                style={styles.submit}
              />
            </View>
          </View>
          <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => { setModalVisible(false); }}
          >
            <AddField
              values={fieldValues}
              onAdd={values => {
                const { name, fieldIndex, ...rest } = values;
                const isPersisted = !!fieldValues;
                const fieldParams = {
                  type: 'input',
                  label: name,
                  name: _.snakeCase(name),
                  ...rest,
                };

                if (isPersisted) {
                  form.mutators.update('fields', fieldIndex, fieldParams);
                } else {
                  form.mutators.push('fields', fieldParams);
                }

                setModalVisible(false);
                setFieldValues(undefined);
              }}
            />
          </Modal>
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

  fieldButton: {
    backgroundColor: '#fbfefd',
    borderColor: '#679b9b',
    borderWidth: 2,
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
    borderColor: '#4d80e4'
  },

  section: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

export default Buildable;
