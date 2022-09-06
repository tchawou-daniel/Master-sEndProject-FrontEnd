import { FormHelperText, InputBaseComponentProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, {
  FC, memo, useState, useCallback, useMemo,
} from 'react';

import { colors, EmpreinttThemeType } from '../../../../branding/theme';
import { FormElementContainer, Input, InputLabel } from '../Input/Input';

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  compiledWrapper: {
    width: '100%',
    backgroundColor: colors['grey-200'],
    padding: theme.spacing(2, 2, 0, 2),
    position: 'relative',
    top: theme.spacing(-5),
    opacity: 0,
    zIndex: 1,
    borderRadius: theme.spacing(0, 0, 1, 1),
    transition: 'opacity .2s, top .2s',
  },
  compiledWrapperWhenFocus: {
    top: theme.spacing(-2),
    opacity: 1,
  },
  input: {
    position: 'relative',
    zIndex: 2,
  },
}));

interface InputWithCompilationProps extends InputBaseComponentProps {
  compiledValue: string;
  showCompiledValueOnUnfocus?: boolean;
}

const InputWithCompilation: FC<InputWithCompilationProps> = ({
  label, error, containerClassName, compiledValue, showCompiledValueOnUnfocus, ...rest
}) => {
  const classes = useStyles();

  const [isFocus, setFocus] = useState<boolean>(false);

  const onEnter = useCallback(() => setFocus(true), []);
  const onLeave = useCallback(() => setFocus(false), []);

  const valueToShow = useMemo(() => {
    if (isFocus) {
      return rest.value;
    }
    return (showCompiledValueOnUnfocus ? compiledValue : rest.value);
  }, [rest.value, compiledValue, isFocus, showCompiledValueOnUnfocus]);

  return (
    <FormElementContainer className={containerClassName}>
      {label && (
      <InputLabel htmlFor={rest?.id}>
        {label}{rest.required ? ' *' : null}
      </InputLabel>
      )}
      <Input
        {...(rest as InputBaseComponentProps)}
        onFocus={onEnter}
        onBlur={onLeave}
        value={valueToShow}
        className={clsx(classes.input, rest?.className)}
      />
      <div className={clsx(classes.compiledWrapper, isFocus && classes.compiledWrapperWhenFocus)}>
        {compiledValue}
      </div>
      {error && (<FormHelperText error>{error}</FormHelperText>)}
    </FormElementContainer>
  );
};

export default memo(InputWithCompilation);
