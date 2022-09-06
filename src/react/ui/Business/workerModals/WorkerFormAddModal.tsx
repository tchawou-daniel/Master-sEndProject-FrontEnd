import {
  Box, Dialog, DialogActions, DialogContent, MenuItem,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { Form, Formik } from 'formik';
import React, { FC, memo, useMemo } from 'react';
import * as Yup from 'yup';

import DialogTitleWithCloseButton from 'react/ui/Generic/DialogTitleWithCloseButton';

import { User, UserRole } from '../../../../types/users';
import { empreinttTheme } from '../../branding/theme';
import { CancelButton, DefaultActionButton } from '../../Generic/Button/Button';
import TextField from '../../Generic/formElements/inputs/TextField/TextField';

interface WorkerFormAddProps {
  onSubmit: (values: Partial<User>) => Promise<any>;
  isOpen: boolean;
  onCancel: () => any;
}

const workerSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your First Name'),
  lastName: Yup.string().required('Please enter your Last Name'),
  email: Yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  role: Yup.mixed<UserRole>().oneOf(Object.values(UserRole)),
  password: Yup.string().required(),
});

export const WorkerFormAddModal: FC<WorkerFormAddProps> = ({
  isOpen, onCancel, onSubmit,
}) => {
  const initialValues = useMemo(() => ({
    firstName: '',
    lastName: '',
    email: '',
    role: UserRole.TEMPORARY_WORKER,
    password: 'SuperSecretP4word',
  }), []);

  const [userRole, setUserRole] = React.useState<string | UserRole>(UserRole.TEMPORARY_WORKER);

  const handleChangeUserRole = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserRole(event.target.value as UserRole);
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={workerSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ isValid, values }) => (
        <Dialog
          open={isOpen}
          onClose={onCancel}
          fullWidth
          className="create-worker-modal"
        >
          <Form autoComplete="off">

            <DialogTitleWithCloseButton handleClose={onCancel}>
              Create a Worker
            </DialogTitleWithCloseButton>
            <DialogContent dividers>

              <br />
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="Name"
                type="firstName"
                component={TextField}
                required
              />
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder="lastName"
                type="text"
                component={TextField}
                required
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                placeholder="Email"
                type="text"
                component={TextField}
                required
              />
              <Box marginTop={empreinttTheme.spacing(0.2)}>
                <Select
                  labelId="userRole"
                  id="userRole"
                  value={userRole}
                  onChange={handleChangeUserRole}
                >
                  {([UserRole.TEMPORARY_WORKER, UserRole.PERMANENT_WORKER]).map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </DialogContent>
            <DialogActions>
              <CancelButton onClick={onCancel}>
                Cancel
              </CancelButton>
              <DefaultActionButton type="submit" disabled={!isValid} onClick={() => { onSubmit(values); }}>
                Submit
              </DefaultActionButton>
            </DialogActions>

          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default memo(WorkerFormAddModal);
