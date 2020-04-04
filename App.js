/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Form from './components/Form';
import api from './services/api';

class App extends Component {
  state = {}

  async componentDidMount() {
    this.setState({ loading: true });
    const fields = await api.get();

    console.log('fields', fields);

    this.setState({ loading: false, fields: fields || [] });
  }

  render() {
    const { fields = [] } = this.state;

    return (
      <Form fields={fields}/>
    );
  }
}

export default App;
