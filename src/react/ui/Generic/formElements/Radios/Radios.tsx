import {
  Box,
  FormControl, FormControlLabel, Radio, RadioGroup, RadioProps,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { snakeCase } from 'lodash';
import React, { FC, memo } from 'react';

import { OptionType } from 'types/__common';

import { EmpreinttThemeType } from 'react/ui/branding/theme';

import formikToMui from '../formikToMui';
import { InputLabel } from '../inputs/Input/Input';

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  root: {
    margin: theme.spacing(2, 0),
  },
}));

interface RadioOptionProps extends OptionType, Pick<RadioProps, 'color'> {}

const RadioOption: FC<RadioOptionProps> = ({ label, value, color }) => (
  <FormControlLabel
    value={value}
    control={<Radio color={color || 'primary'} />}
    label={label}
  />
);

interface RadiosBaseProps extends Pick<RadioProps, 'color'> {
  label: string;
  name?: string;
  options: OptionType[];
  value?: string;
  onChange?: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

export const RadiosBase: FC<RadiosBaseProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  color,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <InputLabel>{label}</InputLabel>
      <FormControl component="fieldset">
        <RadioGroup
          name={name || snakeCase(label)}
          value={value}
          onChange={onChange}
        >
          {options.map(args => (<RadioOption key={args.value} {...args} color={color} />))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

const Radios = memo<RadiosBaseProps>(formikToMui(RadiosBase));

Radios.displayName = 'Radios';

export default Radios;
