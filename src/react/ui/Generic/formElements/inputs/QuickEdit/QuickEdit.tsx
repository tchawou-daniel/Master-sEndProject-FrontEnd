import { Grid, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Check, Edit } from '@material-ui/icons';
import React, {
  memo, FC, useState, useCallback, ReactElement,
} from 'react';

import { EmpreinttThemeType } from 'react/ui/branding/theme';

import { IconButton } from '../../../Button/Button';

interface QuickEditProps {
  currentValue: string;
  onSubmit: (newValue: string) => any;
  children?: ReactElement;
}

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  editIcon: {
    marginLeft: '10px',
  },
  input: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
}));

const QuickEdit: FC<QuickEditProps> = ({
  currentValue,
  onSubmit,
  children,
}) => {
  const classes = useStyles();

  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [value, onChange] = useState<string>(currentValue);

  const onChangeProxy = useCallback((event) => { onChange(event.target.value); }, [onChange]);

  const onClickEdit = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setEditMode(true);
    event.stopPropagation();
  }, []);

  const onFinishEditing = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setEditMode(false);
    onSubmit(value);
    event.stopPropagation();
  }, [setEditMode, value, onSubmit]);

  return isEditMode ? (
    <Grid container direction="row">
      <InputBase value={value} onClick={e => e.stopPropagation()} onChange={onChangeProxy} className={classes.input} />
      <IconButton
        variant="iconOnly"
        size="small"
        onClick={onFinishEditing}
        className={classes.editIcon}
        data-testid="quickedit-submit"
      >
        <Check />
      </IconButton>
    </Grid>
  ) : (
    <Grid container direction="row" alignItems="center">
      {children || currentValue}
      <IconButton
        variant="iconOnly"
        size="small"
        onClick={onClickEdit}
        className={classes.editIcon}
        data-testid="quickedit-edit"
      >
        <Edit />
      </IconButton>
    </Grid>
  );
};

export default memo(QuickEdit);
