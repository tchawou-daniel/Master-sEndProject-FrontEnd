import { Box, DialogTitle } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { FC, memo, ReactNode } from 'react';

import { DefaultActionIconButton } from './Button/Button';

interface DialogTitleWithCloseButtonProps {
  handleClose: () => any;
  children?: ReactNode | string;
  id?: string;
  className?: string;
}

const DialogTitleWithCloseButton: FC<DialogTitleWithCloseButtonProps> = ({
  handleClose,
  children,
  ...props
}) => (
  <DialogTitle {...props}>
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Box flex={1} textAlign="center">
        {children}
      </Box>
      <Box>
        <DefaultActionIconButton
          aria-label="close"
          onClick={handleClose}
        >
          <CloseIcon />
        </DefaultActionIconButton>
      </Box>
    </Box>
  </DialogTitle>
);

export default memo(DialogTitleWithCloseButton);
