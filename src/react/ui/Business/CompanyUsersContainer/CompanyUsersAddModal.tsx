import {
  Box, Dialog, DialogActions, DialogContent, MenuItem,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { Form, Formik } from 'formik';
import React, { FC, memo } from 'react';
import * as Yup from 'yup';

import DialogTitleWithCloseButton from 'react/ui/Generic/DialogTitleWithCloseButton';

import { User, UserRole } from '../../../../types/users';
import { empreinttTheme } from '../../branding/theme';
import { CancelButton, DefaultActionButton } from '../../Generic/Button/Button';
import TextField from '../../Generic/formElements/inputs/TextField/TextField';
import { H5 } from '../../Generic/typography';

interface CompanyUsersAddModalProps {
  onSubmit: (values: Partial<User>) => Promise<any>;
  isOpen: boolean;
  onCancel: () => any;
}

const CompanyUsersSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your First Name'),
  lastName: Yup.string().required('Please enter your Last Name'),
  email: Yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  role: Yup.mixed<UserRole>().oneOf(Object.values(UserRole)),
  password: Yup.string().required(),
});

export const CompanyUsersAddModal: FC<CompanyUsersAddModalProps> = ({
  isOpen, onCancel, onSubmit,
}) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    role: UserRole.TEMPORARY_WORKER,
    password: 'SuperSecretP4word',
  };

  const [userRole, setUserRole] = React.useState<string | UserRole>(UserRole.TEMPORARY_WORKER);

  const handleChangeUserRole = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserRole(event.target.value as UserRole);
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={CompanyUsersSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
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
                New user for this company
              </H5>
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
                  {([UserRole.TEMPORARY_WORKER, UserRole.PERMANENT_WORKER,
                    UserRole.PARTNER_COMPANY_EMPLOYEE, UserRole.PARTNER_COMPANY_EMPLOYEE_ADMIN])
                    .map(option => (
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

export default memo(CompanyUsersAddModal);
