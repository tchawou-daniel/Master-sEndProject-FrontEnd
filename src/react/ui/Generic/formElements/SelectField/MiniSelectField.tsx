import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC, useMemo } from 'react';

import { a11yLabelStyles } from '../../A11YLabel';

import { SelectFieldBase, SelectFieldBaseProps } from './SelectField';

interface MiniSelectFieldProps extends SelectFieldBaseProps {
  options: {
    value: string;
    label: any;
    summary: any;
  }[]
}

const useStyles = makeStyles(theme => ({
  formatSelect: {
    border: 0,
    backgroundColor: 'transparent',
    color: theme.palette.link.main,

    '& $formatSelectOption h6': a11yLabelStyles,
  },
  formatSelectOption: {
    color: theme.palette.link.main,

    '& h6': {
      display: 'inline',
      color: 'black',
      fontSize: '80%',
      marginLeft: theme.spacing(1),
      fontWeight: 'normal',
    },
  },
}));

export const MiniSelectField: FC<MiniSelectFieldProps> = ({ options, ...props }) => {
  const classes = useStyles();
  const FORMAT_OPTIONS = useMemo(
    () => options.map(({ value, summary, label }) => ({
      value,
      label: <Box className={classes.formatSelectOption}>{summary}<h6>{label}</h6></Box>,
    })),
    [classes, options],
  );

  return (
    <SelectFieldBase
      {...props}
      options={FORMAT_OPTIONS}
      className={classes.formatSelect}
    />
  );
};
