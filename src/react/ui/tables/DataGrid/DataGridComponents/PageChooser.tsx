import { ClickAwayListener, Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redo } from '@material-ui/icons';
import React, {
  FC, memo, useCallback, useState,
} from 'react';

import { colors } from 'react/ui/branding/theme';

import useDebouncedInput from '../../../../common/useDebouncedInput';
import { TextFieldBase } from '../../../Generic/formElements/inputs/TextField/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '5rem',
    minWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    margin: 0,
    border: 'none',

    '& > input': {
      textAlign: 'center',
    },
  },
  icon: {
    cursor: 'pointer',
    color: colors['grey-700'],
  },
}));

interface PageChooserProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

const isNumberRegex = /^([0-9])+$/;

const PageChooser: FC<PageChooserProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const [currentPageDebounced, setCurrentPageDebounced] = useState<string>(`${currentPage + 1}`);

  const onCurrentPageChange = useCallback((value: string) => {
    // Only send value to parent if value is number (no empty allowed)
    if (isNumberRegex.test(value)) {
      setCurrentPage(parseInt(value, 10) - 1);
    }
  }, [setCurrentPage]);

  const { onChange: onDebouncedCurrentPageInputChange } = useDebouncedInput(setCurrentPageDebounced, onCurrentPageChange, 500);

  const onChangeProxy = useCallback((e) => {
    // Only save input's value if it's a number or if it's empty (cleared by user)
    if (isNumberRegex.test(e.target.value) || e.target.value === '') {
      onDebouncedCurrentPageInputChange(e.target.value);
    }
  }, [onDebouncedCurrentPageInputChange]);

  const deployPageChooser = useCallback(e => setAnchorEl(e.currentTarget), [setAnchorEl]);
  const closePageChooser = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
    <div
      className={classes.root}
      role="button"
      onClick={deployPageChooser}
      onKeyDown={deployPageChooser}
      tabIndex={0}
    >
      <Redo className={classes.icon} titleAccess="Jump to page" />
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={closePageChooser}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <ClickAwayListener onClickAway={closePageChooser}>
          <TextFieldBase
            className={classes.input}
            type="string"
            value={currentPageDebounced}
            onChange={onChangeProxy}
          />
        </ClickAwayListener>
      </Popover>
    </div>
  );
};

export default memo(PageChooser);
