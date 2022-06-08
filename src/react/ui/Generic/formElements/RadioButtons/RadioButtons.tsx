import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { memo, FC, ReactNode } from 'react';

import { EmpreinttThemeType } from 'react/ui/branding/theme';
import Button, { IconButton } from 'react/ui/Generic/Button/Button';

import formikToMui from '../formikToMui';

export interface ButtonTabsProps {
  options: {
    id: string;
    label: ReactNode;
    title?: ReactNode;
  }[];
  activeId: string | null;
  onClickOption: (id: string) => any;
  type: 'button' | 'chip' | 'icon';
}

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  chip: {
    marginRight: theme.spacing(0.5),
  },
  iconButton: {

    '& + $iconButton': {
      marginLeft: theme.spacing(-2),
    },
  },
}));

const renderButton = ({
  active,
  label,
  classes,
  ...props
}: any) => (
  <Button
    className={classes.button}
    variant={active ? 'contained' : 'outlined'}
    color="tertiary"
    data-active={active}
    {...props}
  >
    {label}
  </Button>
);

const renderChip = ({
  active,
  label,
  classes,
  ...props
}: any) => (
  <Chip
    className={classes.chip}
    color={active ? 'primary' : 'default'}
    label={label}
    data-active={active}
    {...props}
  />
);

const renderIcon = ({
  active,
  label,
  classes,
  ...props
}: any) => (
  <IconButton
    className={classes.iconButton}
    tooltipTitle={props['aria-label']}
    variant="iconOnly"
    color={active ? 'tertiary' : undefined}
    data-active={active}
    {...props}
  >
    {label}
  </IconButton>
);

const renderers = {
  button: renderButton,
  chip: renderChip,
  icon: renderIcon,
};

const RadioButtons: FC<ButtonTabsProps> = ({
  options,
  activeId,
  onClickOption,
  type,
}) => {
  const classes = useStyles();
  const renderElement = renderers[type];

  return (
    <div className={classes.container}>
      {options.map(option => renderElement({
        key: option.id,
        label: option.label,
        active: activeId === option.id,
        onClick: () => onClickOption(option.id),
        classes,
        'aria-label': option.title,
      }))}
    </div>
  );
};

export default memo(RadioButtons);

export const FormikRadioButtons = formikToMui(RadioButtons);
