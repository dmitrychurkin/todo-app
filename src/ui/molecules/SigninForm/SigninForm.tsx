import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { Routes } from 'config/routes';
import { useFormik } from 'formik';
import { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import useFormValidation from './useFormValidation';

import type { FormikConfig } from "formik";
import type { FC, PropsWithChildren } from "react";
import type { UserCredentials } from "infrastructure/AuthService";

export const getInitialValues = () => ({
  email: "",
  password: "",
});

type Props = PropsWithChildren<FormikConfig<UserCredentials>>;

const SigninForm: FC<Props> = ({ children, ...props }) => {
  const formik = useFormik({
    validationSchema: useFormValidation(),
    isInitialValid: false,
    ...props,
  });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={{ mt: 1 }}
    >
      <TextField
        margin="normal"
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={formik.isSubmitting || !formik.isValid}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item>
          <Link component={RouterLink} to={Routes.Signup}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
      {children}
    </Box>
  );
};

SigninForm.defaultProps = {
  initialValues: getInitialValues(),
};

export default memo(SigninForm);
