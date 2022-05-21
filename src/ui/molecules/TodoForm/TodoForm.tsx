import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Status, Todo } from 'domain/Todo';
import { useFormik } from 'formik';
import moment from 'moment';
import { memo, useState } from 'react';

import useFormValidation from './useFormValidation';

import type { FormikConfig, FormikHelpers } from "formik";
import type { FC } from "react";

export const getInitialValues = () => ({
  title: "",
  description: "",
  status: Status.Todo,
  dueDate: new Date().toISOString(),
});

type Props = FormikConfig<Todo>;

const TodoForm: FC<Props> = ({ initialValues, ...restProps }) => {
  const [dueDate, setDueDate] = useState<Date | null>(
    moment(initialValues.dueDate).toDate()
  );

  const onSubmit = (values: Todo, formikHelpers: FormikHelpers<Todo>) => {
    restProps.onSubmit(
      { ...values, dueDate: moment(dueDate).toISOString() },
      formikHelpers
    );
  };

  const formik = useFormik({
    validationSchema: useFormValidation(),
    initialValues,
    isInitialValid: false,
    ...restProps,
    onSubmit,
  });

  const handleDueDateChange = (newValue: Date | null) => {
    setDueDate(newValue);
  };

  const getStatuses = () =>
    Object.values(Status).filter((statusValue) =>
      Number.isNaN(Number(statusValue))
    );

  return (
    <Box
      component="form"
      id="todoForm"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      gap={2}
      sx={{
        display: "grid",
      }}
    >
      <TextField
        sx={{
          mt: 1,
        }}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        id="title"
        name="title"
        label="Task title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
      />
      <TextField
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        id="description"
        name="description"
        label="Task description"
        multiline
        minRows={7}
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
      />
      <FormControl sx={{ mt: 2, width: "min-content" }}>
        <InputLabel id="status" htmlFor="status">
          Status
        </InputLabel>
        <Select
          autoFocus
          value={formik.values.status}
          onChange={formik.handleChange}
          label="Status"
          labelId="status"
          inputProps={{
            name: "status",
            id: "status",
          }}
        >
          {getStatuses().map((statusValue) => (
            <MenuItem key={statusValue} value={statusValue}>
              {statusValue}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DateTimePicker
        label="Due date & time"
        value={dueDate}
        onChange={handleDueDateChange}
        renderInput={(params) => (
          <TextField sx={{ width: "max-content" }} {...params} />
        )}
      />
    </Box>
  );
};

TodoForm.defaultProps = {
  initialValues: getInitialValues(),
};

export default memo(TodoForm);
