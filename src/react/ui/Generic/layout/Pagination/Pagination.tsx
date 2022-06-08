import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import clsx from 'clsx';
import React, { memo, FC, useCallback } from 'react';
import ReactPaginate from 'react-paginate';

import { EmpreinttThemeType } from 'react/ui/branding/theme';

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => any;
  className?: string;
}

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    // React-Paginate creates a ul > li list.
    // So we need to remove its default style.
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  element: {
    verticalAlign: 'middle',
    '& > a': {
      display: 'block',
      padding: theme.spacing(1),
      cursor: 'pointer',
    },
  },
  active: {
    background: 'rgba(106, 53, 255, 0.1)',
    borderRadius: theme.shape.borderRadius,
    fontWeight: 'bold',
  },
}));

const Pagination: FC<PaginationProps> = ({
  current, total, onPageChange, className,
}) => {
  const classes = useStyles();

  const onPageChangeProxy = useCallback(({ selected }) => {
    onPageChange(selected + 1);
  }, [onPageChange]);

  // Careful, this component counts from 0 but nestJs count from
  // 1, thus those +1 / -1.
  return (
    <ReactPaginate
      initialPage={current - 1}
      pageCount={total}
      onPageChange={onPageChangeProxy}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      previousLabel={<ChevronLeft />}
      nextLabel={<ChevronRight />}
      containerClassName={clsx(className, classes.root)}
      pageClassName={classes.element}
      activeClassName={classes.active}
      previousClassName={classes.element}
      nextClassName={classes.element}
    />
  );
};

export default memo(Pagination);
