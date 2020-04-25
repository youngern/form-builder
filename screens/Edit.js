import React, { Component } from 'react';
import Form from '../components/Form';
import api from '../src/services/api';
import Logger from '../src/services/Logger';

class Edit extends Component {
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

export default Edit;
