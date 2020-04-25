import React from 'react';
import _ from 'lodash';
import { Field } from 'react-final-form';

import Input from 'final-form-react-native/components/Form/Input';
import Description from 'final-form-react-native/components/Form/Description';
import Label from 'final-form-react-native/components/Form/Label';

import Logger from 'final-form-react-native/src/services/Logger';

const Question = (values) => {
  const { name, placeholder } = values;

  Logger.log('values', values);
  return (
    <>
      <Field name={`${name}.name`}>{({ input }) => <Label {...input} />}</Field>
      <Field name={`${name}.description`}>
        {({ input }) => <Description {...input} />}
      </Field>
      <Field name={`${name}.initialValue`}>
        {({ input: { value: initialValue } }) => (
          <Field
            name={`${name}.value`}
            initialValue={initialValue}
            placeholder={placeholder}
            subscription={{
              value: true,
              active: true,
              touched: true,
              error: true,
            }}>
            {({ input, meta, ...rest }) => {
              Logger.log('rest', input, rest);
              return <Input {...input} {...rest} />;
            }}
          </Field>
        )}
      </Field>
    </>
  );
};

export default Question;
