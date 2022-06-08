import {
  Switch as MaterialSwitch,
  SwitchClassKey,
  SwitchProps as MaterialSwitchProps,
  Theme,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

const getThumbSize = (size: number) => size * 0.6;

interface SwitchProps extends MaterialSwitchProps {
  classes?: Styles;
  height?: number;
}

export const Switch = withStyles((theme: Theme) => ({
  root: {
    width: (props: SwitchProps) => (props?.height || 32) * 2,
    height: (props: SwitchProps) => props?.height || 32,
    padding: 0,
    display: 'flex',
    opacity: 1,
    margin: 10,
  },
  switchBase: {
    padding: (props: SwitchProps) => (props?.height || 32) * 0.2,
    border: 'none',
    '&$checked + $track': {
      opacity: 1,
      backgroundColor: theme.palette.primary.main,
    },
  },
  thumb: {
    width: (props: SwitchProps) => getThumbSize(props?.height || 32),
    height: (props: SwitchProps) => getThumbSize(props?.height || 32),
    borderRadius: (props: SwitchProps) => (getThumbSize(props?.height || 32)) / 2,
    boxShadow: 'none',
    backgroundColor: theme.palette.common.white,
  },
  track: {
    border: 'none',
    borderRadius: (props: SwitchProps) => (props?.height || 32) / 2,
    opacity: 1,
    '&$checked': {
      opacity: 1,
    },
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
  },
  checked: {
    transform: (props: SwitchProps) => `translateX(${props?.height || 32}px)!important`,
  },
  disabled: {
    opacity: '0.62 !important',
    cursor: 'not-allowed',
  },
}))(({ classes, ...props }: SwitchProps) => (
  <MaterialSwitch
    disableRipple
    classes={{
      root: classes?.root,
      switchBase: classes?.switchBase,
      thumb: classes?.thumb,
      track: classes?.track,
      checked: classes?.checked,
      disabled: classes?.disabled,
    }}
    {...props}
  />
));
