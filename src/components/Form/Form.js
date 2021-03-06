import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import { gql, useMutation } from '@apollo/client';
import _ from 'lodash';
import { Form, Field, FormSpy } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';

import Config from '~/src/services/config';
import Logger from '~/src/services/Logger';
import Input from './Input';
import AddField from './AddField';
import FieldGroup from './FieldGroup';
import FormButton from './FormButton';
import Modal from '../Modal';

const ADD_FIELD = gql`
  mutation createField($field: field_insert_input!) {
    insert_field(objects: [$field]) {
      returning {
        id
      }
    }
  }
`;

const UPDATE_FIELD = gql`
  mutation updateField($id: uuid!, $field: field_set_input!) {
    update_field(_set: $field, where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

const { Colors } = Config;
const required = (value) => (value ? undefined : 'required');

const Buildable = (props) => {
  const { fields = {}, onSubmit } = props;
  const [inputs, setInputs] = useState(fields);
  const [fieldValues, setFieldValues] = useState(undefined);

  const [addField, { data }] = useMutation(ADD_FIELD);
  const [updateField] = useMutation(UPDATE_FIELD);

  useEffect(() => {
    setInputs(fields || {});
  }, [fields]);
  const [modalVisible, setModalVisible] = useState(false);

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
                  name="name"
                  placeholder="Form Name"
                  validate={required}
                  initialValue={inputs.name}>
                  {({ input, meta, ...rest }) => {
                    const error = (meta.touched && meta.error) || undefined;

                    return (
                      <Input
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
                  name="description"
                  placeholder="Enter a description for your form..."
                  initialValue={inputs.description}>
                  {({ input, meta, ...rest }) => {
                    const error = (meta.touched && meta.error) || undefined;

                    return (
                      <Input
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
                    {({ fields }) => {
                      return fields.map((name, index) => (
                        <TouchableOpacity
                          key={name}
                          onPress={() => {
                            const currentFieldValues = _.get(inputs, name);
                            setFieldValues({
                              ...currentFieldValues,
                              fieldIndex: index,
                            });
                            setModalVisible(true);
                          }}
                          style={styles.section}>
                          <FieldGroup
                            name={name}
                            placeholder={_.get(values, `${name}.placeholder`)}
                          />
                        </TouchableOpacity>
                      ));
                    }}
                  </FieldArray>
                </SafeAreaView>
                <FormSpy subscription={{ values: true }}>
                  {({ values }) => <Text>{JSON.stringify(values, 0, 2)}</Text>}
                </FormSpy>
              </ScrollView>
              <FormButton
                accessible
                accessibilityLabel="Add New Field"
                testID="AddButton"
                label="Add Field"
                onPress={() => {
                  setModalVisible(true);
                }}
                style={styles.fieldButton}
                labelStyle={{ fontSize: 20, color: '#679b9b' }}
              />
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
              onRequestClose={() => {
                setModalVisible(false);
              }}>
              <AddField
                values={fieldValues}
                onAdd={(values) => {
                  const { label, fieldIndex, ...rest } = values;
                  const isPersisted = !!fieldValues;
                  const fieldParams = {
                    type: 'input',
                    label,
                    name: _.snakeCase(label),
                    formId: '82d38f92-14a5-4107-b7f3-a0374b3eaf42',
                    ...rest,
                  };

                  if (isPersisted) {
                    updateField({
                      variables: {
                        id: fieldParams.id,
                        field: {
                          type: fieldParams.type,
                          label: fieldParams.label,
                          name: fieldParams.name,
                          required: fieldParams.required,
                          description: fieldParams.description,
                          formId: fieldParams.formId,
                        },
                      },
                    });
                    form.mutators.update('fields', fieldIndex, fieldParams);
                  } else {
                    addField({ variables: { field: fieldParams } });
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
