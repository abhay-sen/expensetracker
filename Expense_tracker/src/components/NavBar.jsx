import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";

import supabase from "../config/supabase";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {useNavigate} from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";


const settings = ["Profile","Dashboard", "Logout"];

function NavBar() {
  const navigate= useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleProfileClick = () => {
    navigate("/UserProfile");
  };

  

  const handleDashboardClick = () => {
    // Redirect to dashboard page or component
    navigate("/dashboard");
  };

  const handleLogoutClick = async () => {
    // Handle logout logic (e.g., clear session data)
    // Optionally, redirect to login page
    const { error } = await supabase.auth.signOut();
    console.log(error);
    navigate("/");
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              width: 150,
            }}
          >
            <img
              src="./../../public/FullLogo_Transparent.png"
              alt="logo"
              style={{ height: "100px", width: "100px" }}
            />
          </Typography>

          <Box sx={{ flexGrow: 0, marginLeft: "85%" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} size="large">
                <AccountCircle fontSize="large"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === "Profile") {
                      handleProfileClick();
                    }  else if (setting === "Dashboard") {
                      handleDashboardClick();
                    } else if (setting === "Logout") {
                      handleLogoutClick();
                    }
                    handleCloseUserMenu(); // Close the menu after handling click
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
