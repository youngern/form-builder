import React, { Fragment, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import _ from 'lodash';
import { Form, Field } from 'react-final-form';
import Config from 'FinalFormReactNative/services/config';
import Input from './Input';
import Error from './Error';
import Label from './Label';
import AddField from './AddField';
import FormButton from './FormButton';
import Modal from '../Modal';

const descriptionPlaceholder = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
`

const { Fonts, Colors } = Config;
const required = (value) => value ? undefined : 'required';
const validate = (constraints) => value => constraints.reduce((error, constraint) => error || required(value), undefined);
const Description = ({ text }) => {
  return (
    <Text style={styles.description}>
      {text.trim()}
    </Text>
  )
}

const Buildable = (props) => {
  const { fields = [], onSubmit } = props;
  const [inputs, setInputs] = useState(fields);
  useEffect(() => { setInputs(fields); }, [fields])

  const submit = async values => {
    const schema = Object.keys(values).map((fieldName) => ({
      type: 'input',
      name: fieldName,
      placeholder: _.startCase(fieldName),
      initialValue: values[fieldName],
      constraints: []
    }));
  
    onSubmit(schema);
  }

  const [modalVisible, setModalVisible] = useState(false);

  const addField = ({ name, ...rest }) => {
    const newInputs = [
      ...inputs,
      {
        type: 'input',
        name: _.snakeCase(name),
        ...rest,
      },
    ];
    setInputs(newInputs);
  }

  return (
    <>
      <Form
        onSubmit={submit}
        subscription={{ submitting: true }}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <Field
                subscription={{ value: true, active: true, touched: true, error: true }}
                name="form_name"
                placeholder="Form Name"
                validate={required}
                initialValue={_.get(_.find(inputs, ['name', 'form_name']), 'initialValue')}
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
                {_.reject(inputs, ({ name }) => name === 'form_name').map(props => {
                  const { name, constraints } = props;

                  return (
                    <Fragment key={name}>
                      <View style={styles.section}>
                        <Label name={name} />
                        <Description text={descriptionPlaceholder} />
                      </View>
                      <Field
                        key={name}
                        subscription={{ value: true, active: true, touched: true, error: true }}
                        validate={validate(constraints)}
                        {...props}
                      >
                        {({ input, meta, ...rest }) => {
                          const error = (meta.touched && meta.error) || undefined;
                          return (
                            <Input
                              style={meta.active ? styles.active : {}}
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
                  onPress={() => { setModalVisible(true); }}
                  style={styles.fieldButton}
                  labelStyle={{ fontSize: 20, color: '#679b9b' }}
                />
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
        )}
      </Form>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false); }}
      >
        <AddField
          onAdd={values => {
            addField(values);
            setModalVisible(false);
          }}
        />
      </Modal>
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
    marginLeft: 10,
  },

  description: {
    fontFamily: Fonts.regular,
    color: '#679b9b',
    fontSize: 12
  }
});

export default Buildable;
