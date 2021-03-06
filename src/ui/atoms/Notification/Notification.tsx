import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import { forwardRef, memo } from 'react';

import type { FC, PropsWithChildren } from "react";

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

type Props = PropsWithChildren<
  SnackbarProps & {
    readonly alertProps: AlertProps;
  }
>;

const Notification: FC<Props> = ({ alertProps, ...restProps }) => (
  <Snackbar {...restProps}>
    <Alert {...alertProps}>{restProps.children}</Alert>
  </Snackbar>
);

Notification.defaultProps = {
  autoHideDuration: 6000,
  alertProps: {},
};

export default memo(Notification);
