import React, { Component } from 'react';
import Fill from './components/Fill';
import api from '~/src/services/api';
import Logger from '~/src/services/Logger';

class Edit extends Component {
  state = {};

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    this.setState({ loading: true });
    const fields = await api.get();
    Logger.log('get fields: view', fields);
    this.setState({ loading: false, fields });
  };

  setValues = async (values) => {
    this.setState({ loading: true, fields: values });
    await api.set(values);
    Logger.log('set values', values);
    this.setState({ loading: false });
  };

  render() {
    const { fields = [] } = this.state;

    return <Fill fields={fields} onSubmit={this.setValues} />;
  }
}

export default Edit;
