import { FormHelperText, InputBaseComponentProps } from '@material-ui/core';
import React, { memo, FC } from 'react';

import InfoWithTooltip from '../../../InfoWithTooltip';
import formikToMui from '../../formikToMui';
import { InputLabel, Input, FormElementContainer } from '../Input/Input';

export const TextFieldBase: FC<InputBaseComponentProps> = ({
  label,
  error,
  hidden,
  containerClassName,
  help,
  ...rest
}) => (
  <FormElementContainer hidden={hidden} className={containerClassName}>
    {label && (
      <InputLabel htmlFor={rest?.id}>
        {label}{rest.required ? ' *' : null}
        {help && <InfoWithTooltip>{help}</InfoWithTooltip>}
      </InputLabel>
    )}
    <Input {...(rest as InputBaseComponentProps)} />
    {error && <FormHelperText error>{error}</FormHelperText>}
  </FormElementContainer>
);

const TextField = memo<InputBaseComponentProps>(formikToMui(TextFieldBase));

TextField.displayName = 'TextField';

export default TextField;
