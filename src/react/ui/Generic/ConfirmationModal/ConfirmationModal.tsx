import {
  CircularProgress,
  Dialog, DialogActions, DialogContent, DialogContentText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { noop } from 'lodash';
import React, {
  memo, ReactNode, useCallback, useState, FC,
} from 'react';

import { EmpreinttThemeType, colors } from '../../branding/theme';
import { CancelButton, DefaultActionButton } from '../Button/Button';
import DialogTitleWithCloseButton from '../DialogTitleWithCloseButton';
import { H5 } from '../typography';

interface ConfirmationModalProps {
  isOpened: boolean;
  title: ReactNode;
  contentText: ReactNode;
  confirmText: ReactNode;
  cancelText: ReactNode;
  handleClose: () => void;
  handleConfirm: () => void;
  isDeleteAction?: boolean;
  isLoading?: boolean;
  additionalActions?: { text: string, callback: () => void }[];
}

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  dialogTitle: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  dialog: {
    '& > div >.MuiDialog-paperWidthSm': {
      minWidth: theme.spacing(65),
    },
  },
  dialogContent: {
    textAlign: 'center',
    color: colors.black,
    textDecoration: theme.typography.fontFamily,
  },
}));
const ConfirmationModal: FC<ConfirmationModalProps> = memo(({
  isOpened,
  title,
  contentText,
  handleClose,
  handleConfirm,
  cancelText,
  confirmText,
  isDeleteAction,
  isLoading,
  additionalActions,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={isOpened} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.dialog}>
      <DialogTitleWithCloseButton
        id="form-dialog-title"
        handleClose={handleClose}
      >
        <H5 className={classes.dialogTitle}>{title}</H5>
      </DialogTitleWithCloseButton>
      <DialogContent>
        <DialogContentText className={classes.dialogContent}>
          {contentText}
        </DialogContentText>
        <DialogActions>
          {isLoading
            ? <CircularProgress size={20} />
            : (
              <>
                { (additionalActions || []).map((action: { text: string, callback: () => void }) => (
                  <DefaultActionButton
                    key={action.text}
                    name={`${action.text}-button`}
                    onClick={action.callback}
                    disabled={isLoading}
                  >
                    {action.text}
                  </DefaultActionButton>
                ))}
                { isDeleteAction ? (
                  <DefaultActionButton
                    name="confirm-button"
                    onClick={handleConfirm}
                    disabled={isLoading}
                  >
                    {confirmText}
                  </DefaultActionButton>
                ) : (
                  <DefaultActionButton
                    name="confirm-button"
                    onClick={handleConfirm}
                    disabled={isLoading}
                  >
                    {confirmText}
                  </DefaultActionButton>
                )}

              </>
            )}
          <CancelButton name="cancel-button" onClick={handleClose}>
            {cancelText}
          </CancelButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
});

export const useConfirmModal = ({
  onConfirm = noop,
  onCancel = noop,
}) => {
  const [isOpened, setIsOpen] = useState<boolean>(false);
  const [passthroughsParams, setPassthroughsParams] = useState<any>(undefined);

  const openModal = useCallback((...params: any) => {
    setIsOpen(true);
    setPassthroughsParams(params);
  }, [setIsOpen]);

  const handleConfirm = useCallback(() => {
    onConfirm(...passthroughsParams);
    setIsOpen(false);
    setPassthroughsParams(undefined);
  }, [onConfirm, setIsOpen, passthroughsParams]);

  const handleClose = useCallback(() => {
    onCancel(...passthroughsParams);
    setIsOpen(false);
    setPassthroughsParams(undefined);
  }, [onCancel, setIsOpen, passthroughsParams]);

  return {
    controls: {
      isOpened,
      handleConfirm,
      handleClose,
    },
    openModal,
  };
};

export default ConfirmationModal;
