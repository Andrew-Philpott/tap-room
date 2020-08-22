import React from "react";
import { useSelector } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import taphouselogo from "../../assets/img/taphouselogo.png";
import * as routes from "../../constants/routes";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    "& a,span": {
      color: "white",
      marginRight: "50px",
      "&:hover, &:focus, &:visited, &:link, &:active": {
        color: "white",
      },
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default () => {
  const user = useSelector((state) => state.authentication.user);
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
        component={Link}
        to={routes.LOG_OUT}
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
      <MenuItem component={Link} to={routes.LANDING}>
        Home
      </MenuItem>
      <MenuItem component={Link} to={routes.BEER_LIST}>
        On Tap
      </MenuItem>
      <MenuItem component={Link} to={routes.ABOUT}>
        About
      </MenuItem>
      {!user ? (
        <MenuItem component={Link} to={routes.LOG_IN}>
          Log in
        </MenuItem>
      ) : (
        <MenuItem onClick={handleProfileMenuOpen}>Account</MenuItem>
      )}
    </Menu>
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
        <div className={classes.sectionDesktop}>
          <Link to={routes.LANDING}>Home</Link>
          <Link to={routes.BEER_LIST}>On Tap</Link>
          <Link to={routes.ABOUT}>About</Link>
          {user ? (
            <span
              className="links"
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
      {renderMobileMenu}
      {renderMenu}
    </React.Fragment>
  );
};
