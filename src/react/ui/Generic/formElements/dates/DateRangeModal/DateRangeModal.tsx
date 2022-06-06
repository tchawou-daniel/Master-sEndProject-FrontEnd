import {
  Box,
  Dialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  Divider,
  Theme,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { DateRange as DateRangeIcon, ArrowRightAlt as ArrowRightAltIcon } from '@material-ui/icons';
import { DatePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import moment, { Moment } from 'moment';
import React, {
  FC, memo, useCallback, useEffect, useState,
} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { DateRange } from 'types/__common';

import { COMMON_MESSAGES } from 'react/common/messages';
import useSnackbars from 'react/common/useSnackbars';
import { EmpreinttThemeType } from 'react/ui/branding/theme';
import Button, { IconButton } from 'react/ui/generic/Button/Button';
import DialogTitleWithCloseButton from 'react/ui/generic/DialogTitleWithCloseButton';
import { InputLabel } from 'react/ui/generic/formElements/inputs/Input/Input';
import { H2 } from 'react/ui/generic/typography';

interface DateRangeMoment {
  startDate: Moment | null;
  endDate: Moment | null;
}

interface DateRangeModalProps {
  label?: string;
  value: DateRange;
  onChange: (value: DateRange) => any;
  placeholder?: string;
  classNames?: { button?: string };
  disabled?: boolean;
}

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  divider: {
    marginTop: theme.spacing(1),
  },
  submitButton: {
    marginLeft: theme.spacing(1),
  },
  dateRangeButton_withValue: {
    width: '100%',
  },
  valueLabel: {
    textAlign: 'center',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  deactivatedUsers: {
    color: theme.palette.grey['600'],
  },
}));

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

// We can't completely hide the Toolbar in the datepicker, so
// we're replacing it with a component that doesn't display anything.
const ToolbarReplacement = () => null;

const dateRangeToMomentRange = (range: DateRange): DateRangeMoment => ({
  startDate: range.startDate ? moment.utc(range.startDate) : null,
  endDate: range.endDate ? moment.utc(range.endDate) : null,
});

const momentRangeToDateRange = (range: DateRangeMoment): DateRange => ({
  startDate: range.startDate ? range.startDate.toDate() : null,
  endDate: range.endDate ? range.endDate.toDate() : null,
});

const DateRangeModal: FC<DateRangeModalProps> = ({
  label,
  value,
  onChange,
  placeholder,
  classNames,
  disabled,
}) => {
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const { snackError } = useSnackbars();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  // We're proxifing values so you can fiddle in the dialog without modifying the real value.
  const [valueProxy, onChangeValueProxy] = useState<DateRangeMoment>({ startDate: null, endDate: null });

  // If user submits, send proxified values to onChange.
  const onApply = useCallback(() => {
    if (disabled) {
      return;
    }

    const dateRange = momentRangeToDateRange(valueProxy);
    // Checking here if startDate < endDate
    if (dateRange.startDate && dateRange.endDate) {
      if (dateRange.startDate.getTime() > dateRange.endDate.getTime()) {
        snackError('You can\'t select a start date that is after the end date');
        return;
      }
    }

    setModalOpen(false);
    onChange(dateRange);
  }, [valueProxy, setModalOpen, onChange, disabled, snackError]);

  // If user dismisses, close the popup and reset proxy.
  const onDismiss = useCallback(() => {
    setModalOpen(false);
    // Reset proxy to initial value.
    onChangeValueProxy(dateRangeToMomentRange(value));
  }, [onChangeValueProxy, value, setModalOpen]);

  const onChangeStart = useCallback((newValue) => {
    if (disabled) {
      return;
    }
    onChangeValueProxy({
      ...valueProxy,
      startDate: newValue,
    });
  }, [onChangeValueProxy, valueProxy, disabled]);

  const onChangeEnd = useCallback((newValue) => {
    if (disabled) {
      return;
    }
    onChangeValueProxy({
      ...valueProxy,
      endDate: newValue,
    });
  }, [onChangeValueProxy, valueProxy, disabled]);

  // When value changed in parent component, refresh the value proxy too
  useEffect(() => onChangeValueProxy(dateRangeToMomentRange(value)), [value]);

  const onOpenModal = useCallback(() => {
    if (disabled) {
      return;
    }
    setModalOpen(true);
  }, [disabled, setModalOpen]);

  const hasValue = valueProxy.startDate || valueProxy.endDate;

  const commonButtonProps = {
    className: clsx(hasValue && classes.dateRangeButton_withValue, classNames?.button),
    startIcon: hasValue || placeholder ? <DateRangeIcon /> : null,
    onClick: onOpenModal,
    size: hasValue || placeholder ? 'small' as 'small' : undefined, // Thank you typescript, you rock.
    disabled,
    children: hasValue
      ? (
        <span className={classes.valueLabel}>
          <span>{valueProxy.startDate ? valueProxy.startDate.format('YYYY-MM-DD') : 'N/A'}</span>
          <ArrowRightAltIcon />
          <span>{valueProxy.endDate ? valueProxy.endDate.format('YYYY-MM-DD') : 'N/A'}</span>
        </span>
      )
      : placeholder || <DateRangeIcon />,
  };

  // Fix: React fire up an error because startIcon is not a props to IconButton.
  const { startIcon, ...restCommonButtonProps } = commonButtonProps;

  return (
    <>
      {label && <InputLabel>{label}</InputLabel>}
      {hasValue
        ? <Button color="tertiary" variant="outlined" {...commonButtonProps} />
        : (placeholder
          ? <Button color="tertiary" variant="outlined" {...commonButtonProps} />
          : (
            <IconButton
              variant="iconOnly"
              tooltipTitle={formatMessage({ defaultMessage: 'Set a date range' })}
              {...restCommonButtonProps}
            >
              <DateRangeIcon />
            </IconButton>
          )
        )}
      <Dialog
        open={isModalOpen}
        onClose={onDismiss}
        // The modal is as large as possible without going over md.
        maxWidth="md"
        fullWidth
      >
        <DialogTitleWithCloseButton handleClose={onDismiss} />
        <DialogContent>
          <Box display="flex" justifyContent="space-evenly">
            <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" aria-label="Start date">
              <H2 color="secondary">
                <FormattedMessage defaultMessage="Start" description="Date Range Modal" />
              </H2>
              <DatePicker
                ToolbarComponent={ToolbarReplacement}
                variant="static"
                value={valueProxy.startDate}
                onChange={onChangeStart}
              />
              <Button color="default" size="small" onClick={() => onChangeStart(null)}>
                <FormattedMessage defaultMessage="Reset" description="Date Range Modal" />
              </Button>
            </Box>
            <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" aria-label="End date">
              <H2 color="secondary">
                <FormattedMessage defaultMessage="End" description="Date Range Modal" />
              </H2>
              <DatePicker
                ToolbarComponent={ToolbarReplacement}
                variant="static"
                value={valueProxy.endDate}
                onChange={onChangeEnd}
              />
              <Button color="default" size="small" onClick={() => onChangeEnd(null)}>
                <FormattedMessage defaultMessage="Reset" description="Date Range Modal" />
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <Divider className={classes.divider} />
        <DialogActions>
          <Button color="default" variant="outlined" onClick={onDismiss}>
            <FormattedMessage {...COMMON_MESSAGES.CANCEL} />
          </Button>
          <Button color="primary" className={classes.submitButton} onClick={onApply}>
            <FormattedMessage {...COMMON_MESSAGES.SAVE} />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(DateRangeModal);
