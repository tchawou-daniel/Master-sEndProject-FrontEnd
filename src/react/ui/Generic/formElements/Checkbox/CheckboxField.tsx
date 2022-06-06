import {
  CheckboxProps, FormHelperText, InputBaseComponentProps,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { uniqueId } from 'lodash';
import React, { memo, FC, useMemo } from 'react';

import formikToMui from 'react/ui/generic/formElements/formikToMui';
import { FormElementContainer, InputLabel } from 'react/ui/generic/formElements/inputs/Input/Input';

import Checkbox from './Checkbox';

const useStyles = makeStyles(() => ({
  inputLabel: {
    cursor: 'pointer',
  },
}));

export type CheckboxFieldBaseProps = Partial<Omit<CheckboxProps, 'value'>> & InputBaseComponentProps;

export const CheckboxFieldBase: FC<CheckboxFieldBaseProps> = ({
  label, error, onChange, value, name, ariaLabel, color, ...rest
}) => {
  const classes = useStyles();
  const uniqueIdentifier = useMemo(() => rest?.id || uniqueId(), [rest]);

  return (
    <FormElementContainer align>
      <Checkbox
        color={(color as 'primary' | 'secondary') || 'secondary'}
        onChange={onChange}
        checked={value}
        name={name}
        aria-label={ariaLabel}
        {...rest}
        id={uniqueIdentifier}
      />
      <InputLabel
        compact
        htmlFor={uniqueIdentifier}
        className={classes.inputLabel}
      >
        {label}
      </InputLabel>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormElementContainer>
  );
};

const CheckboxField = memo<CheckboxFieldBaseProps>(formikToMui(CheckboxFieldBase));

CheckboxField.displayName = 'CheckboxField';

export default CheckboxField;
