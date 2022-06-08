import {
  InputLabel as InputLabelBase,
  InputBase,
  InputBaseComponentProps,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { omit } from 'lodash';
import React, { FC } from 'react';

export const InputLabel = withStyles(theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: (props: any) => (!props.compact ? theme.spacing(1) : undefined),
  },
}))(InputLabelBase);

export const Input = withStyles(theme => ({
  root: {
    width: '100%',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '3px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase) as FC<InputBaseComponentProps>;

export const FormElementContainer = withStyles(theme => ({
  formElementContainer: {
    flex: 1,

    '& + &': {
      marginTop: theme.spacing(3),
    },
  },
  hidden: {
    display: 'none',
  },
  relative: {
    position: 'relative',
  },
  align: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}))((props:any) => (
  <div
    {...omit(props, ['classes', 'hidden', 'className', 'align'])}
    className={clsx(
      props.classes.formElementContainer,
      props.hidden && props.classes.hidden,
      props.className,
      props.align && props.classes.align,
      props.relative && props.classes.relative,
    )}
  />
));
