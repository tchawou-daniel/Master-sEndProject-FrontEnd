import {
  Box,
  Dialog, DialogActions, DialogContent,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, {
  FC, memo,
} from 'react';
import * as yup from 'yup';

import DialogTitleWithCloseButton from 'react/ui/Generic/DialogTitleWithCloseButton';

import { User } from '../../../../types/users';
import { CancelButton, DefaultActionButton } from '../../Generic/Button/Button';
import TextField from '../../Generic/formElements/inputs/TextField/TextField';

interface WorkerFormAddProps {
  onSubmit: (values: Partial<User>) => Promise<any>;
  isOpen: boolean;
  onCancel: () => any;
}

const workerSchema = yup.object().shape({
  firstName: yup.string().required('Please enter your First Name'),
  lastName: yup.string().required('Please enter your Last Name'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

export const WorkerFormAddModal: FC<WorkerFormAddProps> = ({
  isOpen, onCancel, onSubmit,
}) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
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
