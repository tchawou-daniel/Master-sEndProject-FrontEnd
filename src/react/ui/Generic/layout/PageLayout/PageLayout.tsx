import {
  Box, Typography,
} from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import clsx from 'clsx';
import React, { FC, memo, ReactNode } from 'react';

import { COMMON_MESSAGES } from '../../../../common/messages';
import Button, { IconButton } from '../../Button/Button';

import { usePageHeaderStyles } from './usePageLayoutStyles';

export interface PageHeaderButtonProps {
  title: string | ReactNode;
  type?: 'button' | 'reset' | 'submit';
  name: string;
  icon?: ReactNode;
  color?: 'default' | 'primary' | 'tertiary';
  variant?: 'outlined' | 'contained';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

interface PageHeaderProps {
  title: string | ReactNode;
  subTitle?: string | ReactNode;
  containerClassName?: string,
  headerContainerClassName?: string,
  buttonActions?: PageHeaderButtonProps[];
  leftActions?: string | ReactNode;
  rightActions?: string | ReactNode;
  onClickGoBack?: () => void;
  children?: ReactNode;
}

const PageHeaderComponent: FC<PageHeaderProps> = ({
  title,
  subTitle,
  containerClassName,
  headerContainerClassName,
  buttonActions,
  leftActions,
  rightActions,
  onClickGoBack,
  children,
}) => {
  const classes = usePageHeaderStyles();
  return (
    <section className={clsx(classes.container, containerClassName)}>
      <Box className={classes.headerContainer}>
        <Box className={clsx(classes.header, children && classes.headerContainerWithHeaderContent, headerContainerClassName)}>
          {onClickGoBack && (
            <IconButton
              tooltipTitle={COMMON_MESSAGES.GO_BACK}
              aria-label="Go back"
              onClick={onClickGoBack}
              variant="iconOnly"
              className={classes.backButton}
            >
              <KeyboardBackspace fontSize="large" />
            </IconButton>
          )}
          {leftActions && (<Box className={classes.leftActions}>{leftActions}</Box>)}
          <Box className={classes.headerTitle}>
            <Typography variant="h2" component="h1" color="secondary">{title}</Typography>
            {subTitle && (
              <Typography className={classes.subTitle}>{subTitle}</Typography>
            )}
          </Box>
          <Box className={classes.separator} />
          {(buttonActions && buttonActions.length) ? buttonActions.map(btnAction => (
            <Button
              key={btnAction.name}
              startIcon={btnAction.icon}
              onClick={btnAction.onClick}
              color={btnAction.color || 'tertiary'}
              variant={btnAction.variant}
              name={btnAction.name}
              type={btnAction.type}
              className={classes.actionButton}
              disabled={btnAction.disabled}
            >
              {btnAction.title}
            </Button>
          )) : null}
          {rightActions && (<Box className={classes.rightActions}>{rightActions}</Box>)}
        </Box>
        {children}
      </Box>
    </section>
  );
};

export const PageHeader = memo(PageHeaderComponent);
