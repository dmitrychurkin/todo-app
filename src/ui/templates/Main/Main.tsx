import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { logout } from 'infrastructure/AuthService';
import { useSession } from 'providers/Session';
import { useState } from 'react';
import SettingsBar from 'ui/molecules/SettingsBar';

import type { FC, PropsWithChildren, MouseEvent } from "react";

type Props = PropsWithChildren<{}>;

const Main: FC<Props> = ({ children }) => {
  const user = useSession();

  const getUserName = () =>
    user ? user.displayName || user.email?.split("@")[0] : "";

  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElement(null);
  };

  const handleLogout = () => logout();

  return (
    <Box data-testid="main" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {getUserName()}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <SettingsBar />
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElement}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElement)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ my: "auto" }}>{children}</Box>
      </Container>
    </Box>
  );
};

export default Main;
