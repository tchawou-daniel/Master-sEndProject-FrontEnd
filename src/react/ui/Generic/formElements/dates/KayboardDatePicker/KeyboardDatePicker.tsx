import {
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';
import { uniqueId } from 'lodash';
import React, {
  FC, useCallback, useMemo,
} from 'react';

import { EmpreinttThemeType } from 'react/ui/branding/theme';

import { FormElementContainer, InputLabel } from '../../inputs/Input/Input';

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  datePickerInput: {
    '& input': {
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
    },
  },
}));

type DatePickerInlineBaseProps = KeyboardDatePickerProps & { initialDate?: Date };

export const DatePickerInlineBase: FC<DatePickerInlineBaseProps> = ({
  id, label, error, value, onChange, color, initialDate, format, ...rest
}) => {
  const classes = useStyles();

  const realFormat = useMemo(() => format || 'YYYY-MM-DD', [format]);

  // Remove label and generate an id if not passed
  // Removing label to put the Empreint one in place, because
  // that's not possible to style the default one
  const inputId = useMemo(() => id || uniqueId(), [id]);

  const handleOnChange = useCallback(
    newValue => onChange(newValue ? newValue.format(realFormat) : null),
    [onChange, realFormat],
  );

  return (
    <FormElementContainer>
      {label ? (
        <InputLabel htmlFor={inputId}>
          {label}
        </InputLabel>
      ) : null}
      <KeyboardDatePicker
        {...rest}
        initialFocusedDate={initialDate}
        className={classes.datePickerInput}
        margin="none"
        inputVariant="outlined"
        autoOk
        value={value}
        onChange={handleOnChange}
        disableToolbar
        variant="inline"
        format={realFormat}
        fullWidth
        id={inputId}
        label={undefined}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormElementContainer>
  );
};
