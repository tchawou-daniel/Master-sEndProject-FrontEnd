import {
  Box, Container, Grid, Link, ThemeProvider, Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useFormik } from 'formik';
import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import useCurrentUser from 'react/common/useCurrentUser';

import { useThunkDispatch } from 'redux/store';
import { setCurrentUser } from 'redux/users/actions';

import { updateUser } from 'services/users/users.repository';

import { empreinttTheme } from '../../../ui/branding/theme';

const validationSchema = yup.object({
  firstName: yup.string().required('Please enter your First Name'),
  lastName: yup.string().required('Please enter your Last Name'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Register = () => {
  const [edit, setEdit] = React.useState(false);
  const classes = useStyles();
  // const history = useHistory();
  const { user } = useCurrentUser();
  const dispatch = useThunkDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // password: user.password,
    },
    validationSchema,
    onSubmit: async (userToAdd: any) => {
      // console.log("le user to update ", {...user, ...userToAdd});
      const updatedUser = { ...userToAdd, id: user.id, lang: user.role };
      const data = await updateUser(updatedUser);
      if (data) {
        console.log('the updated user ', data);
        await dispatch(setCurrentUser({ ...user, ...data }));
        setEdit(false);
      } else {
        alert('fail to update');
        // setEdit(false)
      }
    },
  });
  const startEdit = (event: any) => {
    setEdit(true);
    event.preventDefault();
  };
  // console.log("the current user ", user)
  return (
    <ThemeProvider theme={empreinttTheme}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
		  marginTop: 8,
		  display: 'flex',
		  flexDirection: 'column',
		  alignItems: 'center',
		  justifyContent: 'center',
		  minHeight: '80vh',
          }}
        >
          <AccountCircle />
          <Typography component="h1" variant="h5">
            User profile
          </Typography>
          <form onSubmit={e => (edit ? formik.handleSubmit(e) : startEdit(e))}>
            <TextField
              style={{ marginBottom: 20 }}
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={e => (edit ? formik.handleChange(e) : null)}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              style={{ marginBottom: 10 }}
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={e => (edit ? formik.handleChange(e) : null)}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              style={{ marginBottom: 10 }}
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={e => (edit ? formik.handleChange(e) : null)}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              className={classes.button}
            >
              {edit ? 'Submit' : 'Edit'}
            </Button>

          </form>
          {edit && (
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            className={classes.button}
            onClick={() => setEdit(false)}
          >
            Cancel
          </Button>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

// ReactDOM.render(<Register />, document.getElementById('root'));

export default Register;
