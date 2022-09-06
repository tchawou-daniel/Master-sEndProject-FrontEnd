import {
  Box,
  Dialog, DialogActions, DialogContent, MenuItem,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import React, {
  FC, memo, useCallback, useMemo,
} from 'react';
import * as Yup from 'yup';

import { User, UserRole } from '../../../../types/users';
import { empreinttTheme, EmpreinttThemeType } from '../../branding/theme';
import { CancelButton, DefaultActionButton } from '../../Generic/Button/Button';
import DialogTitleWithCloseButton from '../../Generic/DialogTitleWithCloseButton';
import TextField from '../../Generic/formElements/inputs/TextField/TextField';
import { H5 } from '../../Generic/typography';

interface CompanyConfigurationFormProps {
  isOpen: boolean,
  user: Partial<User> | null;
  handleSubmit: (user: Partial<User>) => any;
  handleCancel: () => any;
}

const userSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your First Name'),
  lastName: Yup.string().required('Please enter your Last Name'),
  email: Yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  role: Yup.mixed<UserRole>().oneOf(Object.values(UserRole)),
});
const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  selectStyle: {
    width: '100%',
  },
}));

const CompanyUsersEditModal: FC<CompanyConfigurationFormProps> = memo(({
  isOpen,
  user,
  handleSubmit,
  handleCancel,
}) => {
  const classes = useStyles();
  const [userRole, setUserRole] = React.useState<string | UserRole>(user?.role);

  const handleChangeUserRole = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setUserRole(event.target.value as string);
  }, []);

  const handleSubmitProxy = useCallback((values: any) => {
    handleSubmit({
      id: user?.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      role: userRole as UserRole,
    });
  }, [handleSubmit, user?.id, userRole]);

  const initialValues = useMemo(() => ({
    id: user?.id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    role: user?.role,
  }), [user]);

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
        <H5 color="secondary" align="center" style={{ fontWeight: 'bold' }}>Edit Company</H5>
      </DialogTitleWithCloseButton>
      <Formik
        validationSchema={userSchema}
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
                    id="role"
                    value={userRole || initialValues.role}
                    name="role"
                    onChange={handleChangeUserRole}
                    className={classes.selectStyle}
                    variant="outlined"
                  >
                    {([UserRole.TEMPORARY_WORKER, UserRole.PERMANENT_WORKER,
                      UserRole.PARTNER_COMPANY_EMPLOYEE, UserRole.PARTNER_COMPANY_EMPLOYEE_ADMIN]).map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                    ))}
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

export default memo(CompanyUsersEditModal);
