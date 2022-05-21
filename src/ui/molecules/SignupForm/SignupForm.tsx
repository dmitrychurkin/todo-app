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
import type { FC } from "react";

export const getInitialValues = () => ({
  email: "",
  password: "",
  passwordConfirmation: "",
});

type Props = FormikConfig<ReturnType<typeof getInitialValues>>;

const SignupForm: FC<Props> = (props) => {
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
      <TextField
        margin="normal"
        fullWidth
        name="passwordConfirmation"
        label="Confirm Password"
        type="password"
        id="passwordConfirmation"
        autoComplete="confirm-password"
        error={
          formik.touched.passwordConfirmation &&
          Boolean(formik.errors.passwordConfirmation)
        }
        helperText={
          formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation
        }
        value={formik.values.passwordConfirmation}
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
        Sign Up
      </Button>
      <Grid container>
        <Grid item>
          <Link component={RouterLink} to={Routes.Login}>
            {"Have an account? Sign In"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

SignupForm.defaultProps = {
  initialValues: getInitialValues(),
};

export default memo(SignupForm);
