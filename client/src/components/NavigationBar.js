import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import taphouselogo from "../assets/img/taphouselogo.png";
import * as routes from "../constants/routes.js";
import { useStyles } from "./use-styles";
import { userService } from "../services/user-service";

const NavigationBar = (props) => {
  const { user, setUser } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to={routes.ACCOUNT}>
        My account
      </MenuItem>

      <MenuItem
        onClick={() => {
          handleMenuClose();
          userService.logout();
          setUser(null);
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to={routes.LANDING}>
        Home
      </MenuItem>
      <MenuItem component={Link} to={routes.BEER_LIST}>
        On Tap
      </MenuItem>
      <MenuItem component={Link} to={routes.ABOUT}>
        About
      </MenuItem>
      {user === null ? (
        <MenuItem component={Link} to={routes.LOG_IN}>
          Log in
        </MenuItem>
      ) : (
          <MenuItem
            component={Link}
            to={routes.ACCOUNT}
            onClick={handleProfileMenuOpen}
          >
            Account
          </MenuItem>
        )}
    </Menu>
  );

  return (
    <div>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Link to={routes.LANDING}>
            <img
              className={classes.tapHouseLogo}
              src={taphouselogo}
              alt="Tap House Logo"
            />
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to={routes.LANDING}>Home</Link>
            <Link to={routes.BEER_LIST}>On Tap</Link>
            <Link to={routes.ABOUT}>About</Link>
            {user !== null ? (
              <span
                className={`${classes.navLinks} ${classes.pointer}`}
                aria-controls={menuId}
                onClick={handleProfileMenuOpen}
                to={routes.ACCOUNT}
              >
                Account
              </span>
            ) : (
                <Link to={routes.LOG_IN}>Log in</Link>
              )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton onClick={handleMobileMenuOpen}>
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
export { NavigationBar };
