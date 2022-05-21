import { useMemo } from 'react';
import { object, string } from 'yup';

const useFormValidation = () =>
  useMemo(
    () =>
      object().shape({
        email: string()
          .email("Invalid email")
          .max(100, "Email too long!")
          .required("Email is required"),
        password: string()
          .min(6, "Password too short!")
          .max(20, "Password too long!")
          .required("Password is required"),
      }),
    []
  );

export default useFormValidation;
