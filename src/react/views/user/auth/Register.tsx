import {
  Box, Container, Grid, Link, ThemeProvider, Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { LockOutlined } from '@material-ui/icons';
import { useFormik } from 'formik';
import React from 'react';
import ReactDOM from 'react-dom';
import * as yup from 'yup';

import { User } from '../../../../types/users';
import { empreinttTheme } from '../../../ui/branding/theme';

const validationSchema = yup.object({
  firstName: yup.string().required('Please enter your First Name'),
  lastName: yup.string().required('Please enter your Last Name'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Register = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (userToAdd:Partial<User>) => {
      console.log(userToAdd);
      // await addUser(userToAdd);
      // alert(JSON.stringify(userToAdd, null, 2));
    },
  });

  return (
    <ThemeProvider theme={empreinttTheme}>
      <Container component="main" maxWidth="xs">
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
          <LockOutlined />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>

                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              className={classes.button}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/auth/login/callback"
                >
                  Already have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

ReactDOM.render(<Register />, document.getElementById('root'));

export default Register;
