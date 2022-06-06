import {
  Box, Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { uniqueId } from 'lodash';
import React, { memo, FC, useMemo } from 'react';

import { EmpreinttThemeType, colors } from 'react/ui/branding/theme';

import { InputLabel } from '../inputs/Input/Input';

export interface CheckboxProps extends Omit<MuiCheckboxProps, 'color'> {
  color: 'primary' | 'secondary' | 'tertiary';
  compact?: boolean;
  label?: string;
}

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  compact: {
    padding: theme.spacing(0.75, 0.75, 0.75, 0),
  },
  inputLabel: {
    cursor: 'pointer',
    fontWeight: 'normal',
    color: colors.black,
    fontSize: '12px',
    fontFamily: 'Roboto',
    letterSpacing: '1.5px',
  },
}));

const TertiaryCheckbox = withStyles(theme => ({
  root: {
    color: theme.palette.tertiary.main,
  },
}))((props: MuiCheckboxProps) => <MuiCheckbox color="default" {...props} />);

const Checkbox: FC<CheckboxProps> = ({
  color,
  className,
  compact,
  label,
  ...props
}) => {
  const classes = useStyles();
  const uniqueIdentifier = useMemo(() => props?.id || uniqueId(), [props]);

  const computedClassName = clsx(className, compact && classes.compact);

  return (
    <Box className={classes.root}>
      {(color === 'tertiary' ? (
        <TertiaryCheckbox
          className={computedClassName}
          {...props}
          id={uniqueIdentifier}
        />
      ) : (
        <MuiCheckbox
          color={color}
          className={computedClassName}
          {...props}
          id={uniqueIdentifier}
        />
      ))}
      {label ? (
        <InputLabel
          compact
          htmlFor={uniqueIdentifier}
          className={classes.inputLabel}
        >
          {label}
        </InputLabel>
      ) : null}
    </Box>
  );
};

export default memo(Checkbox);
