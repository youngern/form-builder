import React from 'react';
import _ from 'lodash';
import { Field } from 'react-final-form';

import Input from '~/src/components/Form/Input';
import Description from '~/src/components/Form/Description';
import Label from '~/src/components/Form/Label';

import Logger from '~/src/services/Logger';

const Question = (values) => {
  const { name, placeholder } = values;
  return (
    <>
      <Field name={`${name}.label`}>
        {({ input }) => <Label {...input} />}
      </Field>
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
              return <Input {...input} {...rest} />;
            }}
          </Field>
        )}
      </Field>
    </>
  );
};

export default Question;
