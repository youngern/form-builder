import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
} from 'react-native';
import _ from 'lodash';
import { createForm } from 'final-form';
import { Form, Field } from 'react-final-form';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Header, Icon } from 'react-native-elements';
import Input from './Input';
import Error from './Error';
import AddField from './AddField';
import FormButton from './FormButton';
import fields from './schema.json';

const onSubmit = values => {
  const schema = Object.keys(values).map((fieldName) => ({
    type: 'input',
    name: fieldName,
    placeholder: _.startCase(fieldName),
    initialValue: values[fieldName],
    constraints: []
  }));

  console.log('submit', schema);
}

const required = (value) => value ? undefined : 'required';
const validate = (constraints) => value => constraints.reduce((error, constraint) => error || required(value), undefined);

const Label = ({ name }) => (
  <Text style={styles.label}>{_.startCase(name)}</Text>
)

const App = () => {
  const [inputs, setInputs] = useState(fields);
  const [modalVisible, setModalVisible] = useState(false);
  const initialValues = inputs.reduce((values, curr) => ({ ...values, [curr.name]: curr.initialValue }), {})

  const form = createForm({
    onSubmit,
    initialValues,
    subscription: { submitting: true }
  });

  const addField = ({ name, placeholder, initialValue }) => {
    const newInputs = [
      ...inputs,
      {
        type: 'input',
        initialValue,
        name: _.snakeCase(name),
        placeholder,
        constraints: []
      },
    ]

    setInputs(newInputs);

    if (initialValue) {
      form.change(name, initialValue);
    }

    setModalVisible(false);
  }

  return (
    <>
      <Form form={form}>
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
            <SafeAreaView>
              <Field
                subscription={{ value: true, active: true, touched: true, error: true }}
                name="form_name"
                placeholder="Form Name"
                validate={required}
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
              style={styles.container}
            >
              <SafeAreaView>
                {inputs.map(props => {
                  const { name, constraints } = props;

                  return (
                    <Fragment key={name}>
                      <Label name={name} />
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
                  style={styles.submit}
                  labelStyle={{ fontSize: 20 }}
                />
              </SafeAreaView>
            </ScrollView>
            {/* <View style={styles.spy}>
              <FormSpy subscription={{ values: true }}>
                {({ values }) => (
                  <Text>{JSON.stringify(values, undefined, 2)}</Text>
                )}
              </FormSpy>
            </View> */}
            
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
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <AddField onAdd={addField} />
      </Modal>
    </>
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

  formHeader: {
    borderWidth: 0,
    backgroundColor: baseColor,
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

  label: {
    marginLeft: 10,
    fontSize: 18,
    color: '#4d80e4',
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
    borderColor: '#46b3e6',
  },
  
  active: {
    borderColor: '#46b3e6',
  },
});

export default App;
