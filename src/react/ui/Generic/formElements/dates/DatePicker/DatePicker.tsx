import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC, memo } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { EmpreinttThemeType } from '../../../../branding/theme';
import { H3 } from '../../../typography';

const variants = ['year-text', 'quarter', 'month', 'month-text', 'day'];

const makeSelector = (makeName: (granularity: string) => string) => variants.map(v => makeName(v)).join(', ');

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  link: {
    color: theme.palette.tertiary.main,
  },
  datePicker: {
    '& .react-datepicker': {
      borderColor: theme.palette.divider,
      fontFamily: theme.typography.fontFamily,
      fontSize: '0.75 rem',
    },
    '& .react-datepicker__header': {
      backgroundColor: theme.palette.common.white,
      borderBottom: 'none',
    },
    '& .react-datepicker__current-month, & .react-datepicker-time__header, & .react-datepicker-year-header': {
      color: theme.palette.secondary.main,
    },
    '& .react-datepicker__triangle': {
      borderBottomColor: `${theme.palette.common.white} !important`,
    },
    // Cells.
    [makeSelector(g => `& .react-datepicker__${g}-text`)]: {
      border: '1px solid transparent',
    },
    // Selected Cells.
    [makeSelector(g => `& .react-datepicker__${g}--selected, & .react-datepicker__${g}--keyboard-selected`)]: {
      color: theme.palette.tertiary.main,
      border: `1px solid ${theme.palette.tertiary.main}`,
      background: theme.palette.common.white,
    },
    // Selected cells on hover.
    [makeSelector(g => `& .react-datepicker__${g}--selected:hover`)]: {
      backgroundColor: theme.palette.grey['100'],
    },
    // Days on top of calendar.
    '& .react-datepicker__day-names > .react-datepicker__day-name': {
      color: theme.palette.grey['200'],
    },
    // Arrows
    '& .react-datepicker__navigation--previous, & .react-datepicker__navigation--previous:hover': {
      borderRightColor: theme.palette.tertiary.main,
    },
    '& .react-datepicker__navigation--next, & .react-datepicker__navigation--next:hover': {
      borderLeftColor: theme.palette.tertiary.main,
    },
  },
}));

const DatePicker: FC<ReactDatePickerProps> = (props) => {
  const classes = useStyles();
  return (
    <ReactDatePicker
      {...props}
      // locale={user.settings?.language}
      popperClassName={classes.datePicker}
    />
  );
};

export const DatePickerLinkInput: React.FC<any> = React.forwardRef(({ onClick, value }, ref: any) => {
  const classes = useStyles();
  return (
    <Link component="button" onClick={onClick} ref={ref} className={classes.link}>
      <H3 align="center">{value}</H3>
    </Link>
  );
});

export default memo(DatePicker);
