import { InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import clsx from 'clsx';
import React, {
  memo, FC, useCallback,
} from 'react';

import { EmpreinttThemeType } from 'react/ui/branding/theme';
import { Spinner } from 'react/ui/Generic/loaders/Spinner/Spinner';

interface SearchDrawerProps {
  isLoading: boolean;
  filter: string;
  onChangeFilter: (value: string) => void;
  className?: string;
}

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  drawer: {
    width: '400px',
    backgroundColor: theme.palette.common.white,
    // Boundary for the Spinner.
    position: 'relative',
  },
  listContainer: {
    height: '400px',
    overflow: 'auto',
  },
  listElement: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  nameContainer: {
    flex: '1',
    paddingLeft: '8px',
  },
  searchInput: {
    flex: '1',
    margin: `0 ${theme.spacing(1)}px`,
  },
}));

export const SearchDrawerListElement: FC = memo(({
  children,
  ...props
}) => {
  const classes = useStyles();
  return (
    <div className={classes.listElement} {...props}>
      {children}
    </div>
  );
});

export const SearchDrawer: FC<SearchDrawerProps> = memo(({
  children,
  isLoading,
  className,
  filter,
  onChangeFilter,
}) => {
  const classes = useStyles();
  const onChangeProxy = useCallback((e) => { onChangeFilter(e.target.value); }, [onChangeFilter]);

  return (
    <div className={clsx(className, classes.drawer)}>
      <div className={classes.listElement}>
        <Search />
        <InputBase
          className={classes.searchInput}
          name="Search in the drawer"
          placeholder="Search"
          value={filter}
          onChange={onChangeProxy}
        />
      </div>
      <div className={classes.listContainer}>
        {isLoading && <Spinner />}
        {children}
      </div>
    </div>
  );
});
