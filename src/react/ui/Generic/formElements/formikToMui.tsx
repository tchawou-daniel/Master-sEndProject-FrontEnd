import { Field, FieldProps, getIn } from 'formik';
import React, { FC } from 'react';

function hoc<T>(WrappedComponent: FC<T>): FC<T> {
  return ((props) => {
    const FormComponent: FC<FieldProps & { hidden?: boolean }> = (fieldElementProps) => {
      const {
        field, form, hidden, ...currProps
      } = fieldElementProps;
      const hasError = getIn(form.errors, field.name);
      const isTouched = getIn(form.touched, field.name);
      // @ts-ignore
      return !hidden ? <WrappedComponent {...field} {...currProps} form={form} error={isTouched && hasError} /> : null;
    };

    return <Field {...props} component={FormComponent} />;
  }) as FC;
}

export default hoc;
