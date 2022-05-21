import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import type { FC, PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  readonly title: ReactNode;
  readonly icon: ReactNode;
}>;

const Auth: FC<Props> = ({ children, title, icon }) => (
  <Grid data-testid="auth" container component="main" sx={{ height: "100vh" }}>
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>{icon}</Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {children}
      </Box>
    </Grid>
  </Grid>
);

export default Auth;
