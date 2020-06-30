import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import taphouselogo from "../assets/img/taphouselogo.png";
import * as c from "../constants/routes.js";

import { useStyles } from "../components/use-styles";

const NavigationBar = (props) => {
  const { user } = props;
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
      <MenuItem onClick={handleMenuClose} component={Link} to={c.ACCOUNT}>
        My account
      </MenuItem>

      <MenuItem onClick={handleMenuClose} component={Link} to={c.LOG_OUT}>
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
      <MenuItem component={Link} to={c.LANDING}>
        Home
      </MenuItem>

      <MenuItem component={Link} to={c.BEER_LIST}>
        On Tap
      </MenuItem>

      <MenuItem component={Link} to={c.ABOUT}>
        About
      </MenuItem>

      {user === null ? (
        <MenuItem component={Link} to={c.LOG_IN}>
          Log in
        </MenuItem>
      ) : (
        <MenuItem component={Link} to={c.LOG_OUT}>
          Log out
        </MenuItem>
      )}
      {user !== null ? (
        <MenuItem
          component={Link}
          to={c.ACCOUNT}
          onClick={handleProfileMenuOpen}
        >
          Account
        </MenuItem>
      ) : null}
    </Menu>
  );

  return (
    <div>
      <AppBar style={{ backgroundColor: "#cc7000" }} position="static">
        <Toolbar>
          <Link to={c.LANDING}>
            <img
              className={classes.tapHouseLogo}
              src={taphouselogo}
              alt="Tap House Logo"
            />
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link
              className={`${classes.navLinks} ${classes.marginRightFifty}`}
              to={c.LANDING}
            >
              Home
            </Link>
            <Link
              className={`${classes.navLinks} ${classes.marginRightFifty}`}
              to={c.BEER_LIST}
            >
              On Tap
            </Link>
            <Link
              className={`${classes.navLinks} ${classes.marginRightFifty}`}
              to={c.ABOUT}
            >
              About
            </Link>
            {user !== null ? (
              <Link
                className={`${classes.navLinks} ${classes.marginRightFifty}`}
                aria-controls={menuId}
                onClick={handleProfileMenuOpen}
                to={c.ACCOUNT}
              >
                Account
              </Link>
            ) : (
              <Link
                className={`${classes.navLinks} ${classes.marginRightFifty}`}
                to={c.LOG_IN}
              >
                Log in
              </Link>
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
