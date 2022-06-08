import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close, Search } from '@material-ui/icons';
import clsx from 'clsx';
import React, {
  ChangeEvent, FC, MouseEventHandler, useCallback, useMemo, useState, KeyboardEventHandler, useRef, useEffect,
} from 'react';

import { IconButton } from '../../../Button/Button';
import { Input } from '../Input/Input';

const useStyles = makeStyles({
  input: {
    border: 'none',
  },
});

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  forceSearchVisible?: boolean;
  className?: string;
  showBorder?: boolean;
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  onClick,
  onKeyDown,
  forceSearchVisible,
  className,
  showBorder = false,
}) => {
  const classes = useStyles();

  const [searchIsVisible, setSearchIsVisible] = useState<boolean>(!!forceSearchVisible);
  const inputRef: any = useRef();

  useEffect(() => {
    if (forceSearchVisible) {
      inputRef?.current?.focus();
    }
  }, [forceSearchVisible, inputRef]);

  const closeSearch = useCallback(
    () => {
      onChange('');

      // Close input if it's meant to be closed
      if (!forceSearchVisible) {
        setSearchIsVisible(false);
      }
    },
    [onChange, forceSearchVisible],
  );

  const onChangeProxy = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const showClearBtn = useMemo(
    () => !forceSearchVisible || !!value,
    [forceSearchVisible, value],
  );

  if (!searchIsVisible) {
    return (
      <IconButton aria-label="Search" onClick={() => setSearchIsVisible(true)}>
        <Search />
      </IconButton>
    );
  }

  return (
    <Input
      inputRef={inputRef}
      id="search-input"
      className={clsx(className, !showBorder ? classes.input : null)}
      value={value}
      placeholder="Search"
      onChange={onChangeProxy}
      startAdornment={<Search />}
      autoFocus={!forceSearchVisible}
      onClick={onClick}
      onKeyDown={onKeyDown}
      endAdornment={showClearBtn && (
      <InputAdornment position="end">
        <IconButton
          aria-label="clear"
          onClick={closeSearch}
        >
          <Close fontSize="small" />
        </IconButton>
      </InputAdornment>
      )}
    />
  );
};

export default SearchInput;
