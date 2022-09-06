import {
  Box, Dialog, DialogActions, DialogContent, MenuItem,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik, FormikValues } from 'formik';
import React, {
  FC, memo, useCallback, useMemo,
} from 'react';

import DialogTitleWithCloseButton from 'react/ui/Generic/DialogTitleWithCloseButton';

import { User } from '../../../../types/users';
import { empreinttTheme } from '../../branding/theme';
import { CancelButton, DefaultActionButton } from '../../Generic/Button/Button';
import { H5 } from '../../Generic/typography';

interface CompanyUsersAssignModalProps {
  onSubmit: (values: FormikValues) => void;
  users: Partial<User[]>;
  isOpen: boolean;
  onCancel: () => any;
}

const useStyles = makeStyles(() => ({
  selectStyle: {
    width: '100%',
  },
}));

export const CompanyUsersAssignModal: FC<CompanyUsersAssignModalProps> = ({
  isOpen, onCancel,
  onSubmit, users,
}) => {
  const classes = useStyles();
  const [userToAssign, setUserToAssign] = React.useState<Partial<User>>();

  const handleChangeUser = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserToAssign(event.target.value as User);
  };

  const initialValues = useMemo(() => ({
    user: users[0],
  }), [users]);

  const handleSubmitProxy = useCallback((values: any) => {
    onSubmit({
      id: values.user.id,
    });
  }, [onSubmit]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmitProxy}
    >
      {({ isValid, values }) => (
        <Dialog
          open={isOpen}
          onClose={onCancel}
          fullWidth
          className="create-company-user-modal"
        >
          <Form autoComplete="off">

            <DialogTitleWithCloseButton handleClose={onCancel}>
              <H5 color="secondary" align="center" style={{ fontWeight: 'bold' }}>
                Assign a user for this company
              </H5>
            </DialogTitleWithCloseButton>
            <DialogContent dividers>

              <Box marginTop={empreinttTheme.spacing(0.2)}>
                <Select
                  variant="outlined"
                  labelId="userRole"
                  id="userRole"
                  value={userToAssign || initialValues.user}
                  onChange={handleChangeUser}
                  className={classes.selectStyle}
                >
                  {(users)
                    .map(option => (
                      <MenuItem key={option?.id} value={option as any}>
                        {`${option?.lastName} ${option?.firstName}`}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </DialogContent>
            <DialogActions>
              <CancelButton onClick={onCancel}>
                Cancel
              </CancelButton>
              <DefaultActionButton type="submit" disabled={!isValid} onClick={() => { onSubmit(values); onCancel(); }}>
                Submit
              </DefaultActionButton>
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default memo(CompanyUsersAssignModal);
