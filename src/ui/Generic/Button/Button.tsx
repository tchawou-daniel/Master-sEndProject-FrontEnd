import {
  CircularProgress, IconButtonProps, Tooltip,
} from '@material-ui/core';
import MaterialUiButton, { ButtonProps } from '@material-ui/core/Button';
import MaterialIconButton from '@material-ui/core/IconButton/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { FC, memo, useMemo } from 'react';
import {colors, EmpreinttThemeType} from "../theme";


export const useCommonButtonStyles = makeStyles(() => ({
  smallIconButton: {
    height: 15,
    width: 15,
    color: 'white',
    zIndex: 100,
  },
}));

const useButtonStyles = makeStyles((theme: EmpreinttThemeType) => ({
  // Root style.
  rootButton: {
    // 1.5em because lineheight is 150%, 24px because vertical padding by M-UI is 12px
    borderRadius: 'calc((1.5em + 24px) / 2)',
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: '0.05em',
    lineHeight: '150%',
    // Boundary for loading.
    position: 'relative',

    transition: 'background-color .5s, color .5s, border-color .5s',

    '&[disabled]': {
      // Overwrite MUI "none" value. This gives us the possibility
      // to change the cursor, as well as having tooltips on disabled
      // buttons.
      pointerEvents: 'auto',
      cursor: 'not-allowed',
    },
  },

  // Different sizes.
  large: {
    fontSize: '18px',
    padding: '16px 24px 16px 24px',
    borderRadius: 'calc((1.5em + 32px) / 2)',
  },
  expanded: {
    fontSize: '16px',
    padding: '16px 24px 16px 24px',
    borderRadius: 'calc((1.5em + 32px) / 2)',
  },
  medium: {
    fontSize: '16px',
    padding: '12px 16px 12px 16px',
    borderRadius: 'calc((1.5em + 24px) / 2)',
  },
  small: {
    fontSize: '14px',
    padding: '8px 12px 8px 12px',
    borderRadius: 'calc((1.5em + 16px) / 2)',
  },

  // Colors.
  default: {
    color: 'rgba(0, 0, 0, 0.54)',
    '& $progress': {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    '&$outlined': {
      // borderColor: 'rgba(0, 0, 0, 0.54)',
      '&:hover': {
      },
    },
  },
  primary: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '& $progress': {
      color: theme.palette.secondary.main,
    },
    '&$outlined': {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: colors['primary-50'],
      },
      '& $progress': {
        color: theme.palette.primary.main,
      },
    },
  },
  secondary: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    '& $progress': {
      color: theme.palette.primary.main,
    },
    '&$outlined': {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: colors['secondary-50'],
      },
      '& $progress': {
        color: theme.palette.secondary.main,
      },
    },
  },
  tertiary: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.link.main,
    '&:hover': {
      backgroundColor: theme.palette.link.light,
    },
    '& $progress': {
      color: theme.palette.common.white,
    },
    '&$outlined': {
      color: theme.palette.link.main,
      borderColor: theme.palette.link.main,
      '&:hover': {
        backgroundColor: colors['tertiary-50'],
      },
      '& $progress': {
        color: theme.palette.link.main,
      },
    },
  },

  action: {
    color: theme.palette.common.white,
    backgroundColor: colors['grey-700'],
    '&.MuiIconButton-root:hover': {
      backgroundColor: theme.palette.link.main,
    },
    '& $progress': {
      color: theme.palette.common.white,
    },
    '&$outlined': {
      color: colors['grey-800'],
      borderColor: colors['grey-800'],
      '&:hover': {
        backgroundColor: colors['grey-300'],
      },
      '& $progress': {
        color: theme.palette.link.main,
      },
    },
  },

  // Outline.
  outlined: {
    border: `1px solid ${theme.palette.grey['300']}`,
    backgroundColor: theme.palette.common.white,

    '&:hover': {
      backgroundColor: colors['grey-100'],
    },
    '&[disabled]': {
      color: theme.palette.grey['300'],
      borderColor: theme.palette.grey['300'],
    },
  },

  // Icon Only
  iconOnly: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',

    '&:hover': {
      backgroundColor: '#eee',
    },

    '&$outlined': {
      borderColor: 'transparent',
    },

    // Default icon action button
    '&$default': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      transition: 'color 0.5s, background-color 0.5s',

      '&:hover': {
        backgroundColor: colors['tertiary-50'],
        color: theme.palette.link.main,
      },
    },
  },

  progress: {
    // color: green[500],
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
}));

interface EmpreinttButtonProps extends Omit<ButtonProps, 'color'> {
  color?: 'default' | 'primary' | 'tertiary';
  noColor?: boolean;
  variant?: 'outlined' | 'contained';
  className?: string;
  tooltipTitle?: string;
}

const Button: FC<EmpreinttButtonProps> = ({
                                         variant,
                                         color,
                                         noColor,
                                         size,
                                         children,
                                         className,
                                         tooltipTitle,
                                         ...props
                                       }) => {
  const classes = useButtonStyles();

  const computedClassName = useMemo(() => clsx(
      // Eventual override.
      className,
      // Default style.
      classes.rootButton,
      // Size.
      size ? classes[size as 'small' | 'medium' | 'expanded' | 'large'] : classes.medium,
      // Color.
      !noColor && classes[color || 'primary'],
      // Outlined.
      variant === 'outlined' && classes.outlined,
  ), [variant, color, size, classes, className, noColor]);

  const render = (
      <MaterialUiButton
          variant={variant || (noColor ? undefined : 'contained')}
          className={computedClassName}
          disableElevation
          {...props}
      >
        {children}
      </MaterialUiButton>
  );

  // Eventually wrap into the tooltip if needed.
  return tooltipTitle ? (
      <Tooltip title={tooltipTitle}>
        {render}
      </Tooltip>
  ) : render;
};

export const DefaultActionButton: FC<EmpreinttButtonProps> = props => (
    <Button
        {...props}
        variant="contained"
        color="primary"
    />
);

export const TertiaryBlockButton: FC<EmpreinttButtonProps> = props => (
    <Button
        {...props}
        variant="contained"
        color="tertiary"
    />
);

export const TertiaryButton: FC<EmpreinttButtonProps> = props => (
    <Button
        {...props}
        variant="outlined"
        color="tertiary"
    />
);

export const CancelButton: FC<EmpreinttButtonProps> = props => (
    <Button
        {...props}
        variant="outlined"
        color="default"
    />
);

export default Button;

interface EmpreinttIconButtonProps extends Omit<IconButtonProps, 'color'> {
  color?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'action';
  variant?: 'outlined' | 'iconOnly' | 'contained';
  tooltipTitle?: string;
  className?: string;
  loading?: boolean;
}

export const IconButton: FC<EmpreinttIconButtonProps> = memo(({
                                                             color,
                                                             children,
                                                             variant,
                                                             tooltipTitle,
                                                             className,
                                                             loading,
                                                             ...props
                                                           }) => {
  const classes = useButtonStyles();

  const computedClassName = useMemo(() => clsx(
      // Eventual override.
      className,
      // Color.
      classes[color || 'default'],
      // Outlined.
      (variant === 'outlined' || variant === 'iconOnly') && classes.outlined,
      // Icon Only
      variant === 'iconOnly' && classes.iconOnly,
  ), [variant, color, classes, className]);

  const ariaLabel = props['aria-label'] || tooltipTitle || undefined;

  const render = (
      <MaterialIconButton
          className={computedClassName}
          {...props}
          aria-label={ariaLabel}
      >
        {children}
        {loading && <CircularProgress size={48} className={classes.progress} />}
      </MaterialIconButton>
  );

  // Eventually wrap into the tooltip if needed.
  return tooltipTitle ? (
      <Tooltip title={tooltipTitle}>
        {render}
      </Tooltip>
  ) : render;
});

export const DefaultActionIconButton: FC<EmpreinttIconButtonProps> = props => (
    <IconButton
        {...props}
        variant="iconOnly"
        color="default"
    />
);
