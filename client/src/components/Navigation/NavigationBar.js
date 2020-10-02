import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import taphouselogo from "../../assets/img/taphouselogo.png";
import * as routes from "../../constants/routes";
import "./index.css";

export default ({ isAuth, onSignInOrSignOut }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const signInSignOut = () => {
    onSignInOrSignOut(false);
  };

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

  const navLinks = [
    { to: routes.LANDING, text: "Home" },
    { to: routes.BEER_LIST, text: "On Tap" },
    { to: routes.ABOUT, text: "About" },
    {
      text: !isAuth ? "Sign In" : "Account",
      onClick: !isAuth ? signInSignOut : handleProfileMenuOpen,
    },
  ];

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  const menu = (menuOpen, menuClose, id, anchor, children) => {
    return (
      <Menu
        anchorEl={anchor}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={id}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={menuOpen}
        onClose={menuClose}
      >
        {children}
      </Menu>
    );
  };

  const desktopMenu = menu(isMenuOpen, handleMenuClose, menuId, anchorEl, [
    <MenuItem
      key={1}
      onClick={handleMenuClose}
      component={Link}
      to={routes.ACCOUNT}
    >
      My account
    </MenuItem>,
    <MenuItem
      key={2}
      onClick={() => {
        handleMenuClose();
        signInSignOut();
      }}
    >
      Sign Out
    </MenuItem>,
  ]);

  const mobileMenu = menu(
    isMobileMenuOpen,
    handleMobileMenuClose,
    mobileMenuId,
    mobileMoreAnchorEl,
    navLinks.map((x, index) => (
      <MenuItem
        key={index}
        onClick={x.onClick && x.onClick}
        component={x.to && Link}
        to={x.to && x.to}
      >
        {x.text}
      </MenuItem>
    ))
  );

  return (
    <React.Fragment>
      <Toolbar className="nav-bar">
        <Link to={routes.LANDING}>
          <img
            className="taphouse-logo"
            src={taphouselogo}
            alt="Tap House Logo"
          />
        </Link>
        <div className="flex-grow-1" />
        <div className="section-desktop">
          {navLinks.map((x, index) => (
            <Button
              key={index}
              onClick={x.onClick && x.onClick}
              component={x.to && Link}
              to={x.to && x.to}
            >
              {x.text}
            </Button>
          ))}
        </div>
        <div className="section-mobile">
          <IconButton onClick={handleMobileMenuOpen}>
            <MoreIcon />
          </IconButton>
        </div>
        {mobileMenu}
        {desktopMenu}
      </Toolbar>
    </React.Fragment>
  );
};
