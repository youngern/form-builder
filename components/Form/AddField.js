import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import _ from 'lodash';
import { Form, Field } from 'react-final-form';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Header, Icon } from 'react-native-elements';
import Input from './Input';
import Error from './Error';
import FormButton from './FormButton';

const required = (value) => value ? undefined : 'required';
const App = (props) => {
  const { onAdd } = props;

  return (
    <>
      <Header
        containerStyle={{ borderBottomWidth: undefined }}
        backgroundColor="#fff"
        leftComponent={(
          <Icon
            name='clear'
            type='material-icons'
            color='#4d80e4'
            onPress={() => { setModalVisible(false); }}
          />
        )}
      />
      <Form onSubmit={onAdd}>
        {({ handleSubmit }) => (
          <SafeAreaView style={{ flex: 1 }}>
            <View>
              <Text style={styles.fieldHeader}>Add Field</Text>
              <Field
                subscription={{ value: true, active: true, touched: true, error: true }}
                name="name"
                placeholder="Name"
                validate={required}
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
              <Error name="name" />
              <Field
                subscription={{ value: true, active: true, touched: true, error: true }}
                name="placeholder"
                placeholder="Placeholder"
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
              <Error name="name" />
              <Field
                subscription={{ value: true, active: true, touched: true, error: true }}
                name="initialValue"
                placeholder="Initial Value"
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
              <Error name="initialValue" />
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
