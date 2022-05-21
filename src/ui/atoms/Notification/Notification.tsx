import type { FC, PropsWithChildren } from 'react';

import { memo, forwardRef } from "react";

import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>((
    props,
    ref,
) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

type Props = PropsWithChildren<
    SnackbarProps & {
        readonly alertProps: AlertProps
    }
>;

const Notification: FC<Props> = ({ alertProps, ...restProps }) => (
    <Snackbar {...restProps} >
        <Alert {...alertProps}>
            {restProps.children}
        </Alert>
    </Snackbar>
);

Notification.defaultProps = {
    autoHideDuration: 6000,
    alertProps: {}
};

export default memo(Notification);
