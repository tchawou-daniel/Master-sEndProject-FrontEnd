import {
  Box, Container, Grid, Link, ThemeProvider, Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { LockOutlined } from '@material-ui/icons';
import { useFormik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useThunkDispatch } from '../../../../redux/store';
import { fetchCurrentUser } from '../../../../redux/users/actions';
import { getUserToken } from '../../../../services/auth/authentification.repository';
import http from '../../../../services/http';
import { User } from '../../../../types/users';
import { empreinttTheme } from '../../../ui/theme';

const validationSchema = yup.object({
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

const Login:FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useThunkDispatch();

  const [signedInSuccess, setSignedInSuccess] = useState<boolean>(false);

  // const signInAndFetchUser = (isSignIn:boolean) => async () => {
  //   if (isSignIn) dispatch(fetchCurrentUser());
  // };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    // eslint-disable-next-line consistent-return
    onSubmit: async (userToAdd:Partial<User>) => {
      try {
        const token = await getUserToken(userToAdd);
        http.setJwt(token.data.accessToken);
        localStorage.setItem('MY_USER_EMAIL', userToAdd.email!);
        await dispatch(fetchCurrentUser());
        // setSignedInSuccess(true);
        // signInAndFetchUser(signedInSuccess);
        history.push('/companies');
      } catch (error){
        await Promise.reject(error);
      }
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
                  href="/auth/register"
                >
                  Do you want to create an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

// ReactDOM.render(<Login />, document.getElementById('root'));

export default Login;
