import React from 'react';
import _ from 'lodash';
import { Field } from 'react-final-form';
import Input from './Input';
import Description from './Description';
import Label from './Label';

const FieldGroup = ({ name, placeholder }) => {
  return (
    <>
      <Field
        name={`${name}.name`}
        subscription={{
          value: true,
          active: true,
          touched: true,
          error: true,
        }}>
        {({ input }) => <Label {...input} />}
      </Field>
      <Field
        name={`${name}.description`}
        subscription={{
          value: true,
          active: true,
          touched: true,
          error: true,
        }}>
        {({ input }) => <Description {...input} />}
      </Field>
      <Field
        name={`${name}.initialValue`}
        placeholder={placeholder}
        subscription={{
          value: true,
          active: true,
          touched: true,
          error: true,
        }}>
        {({ input, meta, ...rest }) => {
          return <Input {...input} {...rest} />;
        }}
      </Field>
    </>
  );
};

export default FieldGroup;
