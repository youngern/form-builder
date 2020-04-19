/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

if (__DEV__) {
  import('./support/ReactotronConfig').then(() =>
    Logger.log('Reactotron Configured'),
  );
}

import React, { Component } from 'react';
import Form from './components/Form';
import api from './services/api';
import Logger from './services/Logger';

class App extends Component {
  state = {};

  async componentDidMount() {
    this.setState({ loading: true });
    const fields = await api.get();

    Logger.log('get fields', fields);
    this.setState({ loading: false, fields });
  }

  setValues = async (values) => {
    this.setState({ loading: true, fields: values });
    await api.set(values);
    Logger.log('set values', values);
    this.setState({ loading: false });
  };

  render() {
    const { fields = [] } = this.state;

    return <Form fields={fields} onSubmit={this.setValues} />;
  }
}

export default App;
