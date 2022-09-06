import {
  Box,
  Dialog, DialogActions, DialogContent, MenuItem,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { Form, Formik } from 'formik';
import React, {
  FC, memo, useCallback, useMemo,
} from 'react';
import * as Yup from 'yup';

import { User, UserRole } from '../../../../../types/users';
import { empreinttTheme } from '../../../branding/theme';
import { CancelButton, DefaultActionButton } from '../../../Generic/Button/Button';
import DialogTitleWithCloseButton from '../../../Generic/DialogTitleWithCloseButton';
import TextField from '../../../Generic/formElements/inputs/TextField/TextField';
import { H5 } from '../../../Generic/typography';

interface AgencyUsersConfigurationFormProps {
  isOpen: boolean,
  agencyUsers: User | null;
  handleSubmit: (agencyUser: Partial<User>) => any;
  handleCancel: () => any;
}

const agencySchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your First Name'),
  lastName: Yup.string().required('Please enter your Last Name'),
  email: Yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  role: Yup.mixed<UserRole>().oneOf(Object.values(UserRole)),
});

const AgencyUsersConfigurationForm: FC<AgencyUsersConfigurationFormProps> = memo(({
  isOpen,
  agencyUsers,
  handleSubmit,
  handleCancel,
}) => {
  const [userRole, setUserRole] = React.useState<string | UserRole>(agencyUsers?.role);

  const handleChangeUserRole = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserRole(event.target.value as UserRole);
  };

  const handleSubmitProxy = useCallback((values: any) => {
    handleSubmit({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      role: values.role,
    });
  }, [handleSubmit]);

  const initialValues = useMemo(() => ({
    id: agencyUsers?.id,
    firstName: agencyUsers?.firstName,
    lastName: agencyUsers?.lastName,
    email: agencyUsers?.email,
    role: agencyUsers?.role,
  }), [agencyUsers]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      aria-labelledby="company-dialog-title"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitleWithCloseButton
        id="company-dialog-title"
        handleClose={handleCancel}
      >
        <H5 color="secondary" align="center" style={{ fontWeight: 'bold' }}>Edit Agency Users</H5>
      </DialogTitleWithCloseButton>
      <Formik
        validationSchema={agencySchema}
        initialValues={initialValues}
        onSubmit={handleSubmitProxy}
      >
        {({ isValid, values }) => (
          <Form>
            <DialogContent>
              <DialogContent dividers>

                <br />
                <TextField
                  id="firstName"
                  name="firstName"
                  label="firstName"
                  placeholder="firstName"
                  type="text"
                  component={TextField}
                  required
                />
                <TextField
                  id="lastName"
                  name="lastName"
                  label="lastName"
                  placeholder="lastName"
                  type="text"
                  component={TextField}
                  required
                />
                <TextField
                  id="email"
                  name="email"
                  label="email"
                  placeholder="email"
                  type="text"
                  component={TextField}
                  required
                />
                <Box marginTop={empreinttTheme.spacing(0.2)}>
                  <Select
                    labelId="userRole"
                    id="userRole"
                    value={userRole || initialValues.role}
                    onChange={handleChangeUserRole}
                  >
                    <MenuItem key={UserRole.EMPLOYMENT_AGENCY} value={UserRole.EMPLOYMENT_AGENCY}>
                      {UserRole.EMPLOYMENT_AGENCY}
                    </MenuItem>
                  </Select>
                </Box>
              </DialogContent>

              <DialogActions>
                <CancelButton name="cancel-button" onClick={handleCancel}>
                  Cancel
                </CancelButton>
                <DefaultActionButton name="submit-button" type="submit" disabled={!isValid} onClick={() => { handleSubmit(values); }}>
                  Submit
                </DefaultActionButton>
              </DialogActions>
            </DialogContent>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
});

export default memo(AgencyUsersConfigurationForm);
