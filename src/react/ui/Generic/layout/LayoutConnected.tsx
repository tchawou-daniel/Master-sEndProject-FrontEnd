import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { FC, ReactNode, useMemo } from 'react';

import useCurrentUser, { UseDefinedCurrentUserHookInterface } from '../../../common/useCurrentUser';
import { EmpreinttThemeType } from '../../branding/theme';
import FullWidthLoader from '../loaders/FullWidthLoader/FullWidthLoader';
import { Spinner } from '../loaders/Spinner/Spinner';
import EmpreinttAppBar from '../navigation/Appbar/EmpreinttAppBar';

interface LayoutConnectedProps {
  currentPage: string;
  subNav?: any[];
  actions?: any[];
  navTab?: any;
  containerMaxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  isLoading?: boolean;
  showLoadingBar?: boolean;
  classNames?: { root?: string };
  removeYMargins?: boolean;
  children: ReactNode;
}

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  container: {
    position: 'relative',
    minHeight: '300px',
  },
  containerWithPaddingBottom: {
    paddingBottom: theme.spacing(5),
  },
  containerWidth: {
    maxWidth: '85%',

    '@media (min-width: 2000px)': {
      maxWidth: '1700px',
    },
  },
}));

const LayoutConnected: FC<LayoutConnectedProps> = ({
  children,
  currentPage,
  subNav,
  actions,
  navTab,
  containerMaxWidth,
  isLoading,
  showLoadingBar,
  classNames,
  removeYMargins,
}) => {
  const { user } = useCurrentUser() as UseDefinedCurrentUserHookInterface;
  const classes = useStyles();

  const containerClasses: (string | undefined)[] = useMemo(
    () => {
      const containerClassArray = [classes.container, classNames?.root];
      if (!containerMaxWidth) {
        containerClassArray.push(classes.containerWidth);
      }
      if (!removeYMargins) {
        containerClassArray.push(classes.containerWithPaddingBottom);
      }
      return containerClassArray;
    },
    [classNames?.root, classes, containerMaxWidth, removeYMargins],
  );

  return (
    <>
      <EmpreinttAppBar
        user={user}
      />

      <FullWidthLoader show={showLoadingBar || false} />

      <Container
        maxWidth={containerMaxWidth || false}
        className={clsx(containerClasses)}
      >
        {isLoading ? <Spinner /> : (
          <Box mt={removeYMargins ? 0 : 3}>
            {children}
          </Box>
        )}
      </Container>
    </>
  );
};

export default LayoutConnected;
