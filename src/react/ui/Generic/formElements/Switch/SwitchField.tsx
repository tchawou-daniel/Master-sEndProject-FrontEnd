import {
  FormHelperText, InputBaseComponentProps, SwitchProps,
} from '@material-ui/core';
import { uniqueId } from 'lodash';
import React, {
  memo, FC, useMemo, ReactElement,
} from 'react';

import InfoWithTooltip from '../../InfoWithTooltip';
import formikToMui from '../formikToMui';
import { FormElementContainer, InputLabel } from '../inputs/Input/Input';

import { Switch } from './Switch';

type SwitchFieldBaseProps = Partial<Omit<SwitchProps, 'value'>> & InputBaseComponentProps & {
  labelLeft?: string;
  help?: ReactElement | string;
};

export const SwitchFieldBase: FC<SwitchFieldBaseProps> = ({
  label,
  labelLeft,
  help,
  error,
  onChange,
  value,
  name,
  ariaLabel,
  color,
  ...rest
}) => {
  const uniqueIdentifier = useMemo(() => rest?.id || uniqueId(), [rest]);

  return (
    <FormElementContainer align>
      {labelLeft && (<InputLabel compact htmlFor={uniqueIdentifier}>{labelLeft}</InputLabel>)}
      <Switch
        id={uniqueIdentifier}
        color={(color as 'primary' | 'secondary') || 'secondary'}
        onChange={onChange}
        checked={value}
        name={name}
        aria-label={ariaLabel}
        height={23}
        {...rest}
      />
      <InputLabel compact htmlFor={uniqueIdentifier}>{label}</InputLabel>
      {help && <InfoWithTooltip>{help}</InfoWithTooltip>}
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormElementContainer>
  );
};

const SwitchField = memo<SwitchFieldBaseProps>(formikToMui(SwitchFieldBase));

SwitchField.displayName = 'SwitchField';

export default memo(SwitchField);
