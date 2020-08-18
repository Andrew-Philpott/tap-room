import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import taphouselogo from "../assets/img/taphouselogo.png";
import { useStyles } from "./use-styles";
import {
  ACCOUNT,
  LANDING,
  LOG_IN,
  BEER_LIST,
  ABOUT,
  LOG_OUT,
} from "../constants/routes";
import { userActions } from "../actions/user-actions";

const NavigationBar = () => {
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  console.log(user);
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
      <MenuItem onClick={handleMenuClose} component={Link} to={ACCOUNT}>
        My account
      </MenuItem>

      <MenuItem
        component={Link}
        to={LOG_OUT}
        onClick={() => {
          handleMenuClose();
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
      <MenuItem component={Link} to={LANDING}>
        Home
      </MenuItem>
      <MenuItem component={Link} to={BEER_LIST}>
        On Tap
      </MenuItem>
      <MenuItem component={Link} to={ABOUT}>
        About
      </MenuItem>
      {user === undefined ? (
        <MenuItem component={Link} to={LOG_IN}>
          Log in
        </MenuItem>
      ) : (
        <MenuItem component={Link} to={ACCOUNT} onClick={handleProfileMenuOpen}>
          Account
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Link to={LANDING}>
            <img
              className={classes.tapHouseLogo}
              src={taphouselogo}
              alt="Tap House Logo"
            />
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to={LANDING}>Home</Link>
            <Link to={BEER_LIST}>On Tap</Link>
            <Link to={ABOUT}>About</Link>
            {user ? (
              <span
                className={`${classes.navLinks} ${classes.pointer}`}
                aria-controls={menuId}
                onClick={handleProfileMenuOpen}
                to={ACCOUNT}
              >
                Account
              </span>
            ) : (
              <Link to={LOG_IN}>Log in</Link>
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
