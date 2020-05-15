import React from "react";
import { makeStyles } from "../About/NavigationBar/node_modules/@material-ui/core/styles";
import AppBar from "../About/NavigationBar/node_modules/@material-ui/core/AppBar";
import Toolbar from "../About/NavigationBar/node_modules/@material-ui/core/Toolbar";
import IconButton from "../About/NavigationBar/node_modules/@material-ui/core/IconButton";
import MenuItem from "../About/NavigationBar/node_modules/@material-ui/core/MenuItem";
import Menu from "../About/NavigationBar/node_modules/@material-ui/core/Menu";
import { Button } from "../components/About/Home/node_modules/@material-ui/core";
import MoreIcon from "../About/NavigationBar/node_modules/@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import taphouselogo from "../../assets/img/taphouselogo.png";
import * as c from "../../../constants/routes";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  inputRoot: {
    color: "inherit",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  center: {
    justifyContent: "center",
  },
  navLinks: {
    color: "white",
    textDecoration: "none",
  },
  navbar: {
    backgroundColor: "#00acee",
  },
}));

const NavigationBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.authentication.user);
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
      <MenuItem onClick={handleMenuClose}>
        <Link
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
          to={c.ACCOUNT}
        >
          My account
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Button
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
          href={c.SIGN_OUT}
        >
          Logout
        </Button>
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
      <MenuItem>
        <Link
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
          to={c.LANDING}
        >
          Home
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
          to={c.BEER_LIST}
        >
          On Tap
        </Link>
      </MenuItem>
      {/* <MenuItem>
        <Link
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
          to={c.FOOD}
        >
          Food
        </Link>
      </MenuItem> */}
      <MenuItem>
        <Link
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
          to={c.ABOUT}
        >
          About
        </Link>
      </MenuItem>
      {user == null ? (
        <MenuItem>
          <Link
            style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
            to={c.SIGN_IN}
          >
            Sign in
          </Link>
        </MenuItem>
      ) : (
        <MenuItem>
          <Link
            style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
            to={c.SIGN_OUT}
          >
            Sign out
          </Link>
        </MenuItem>
      )}
      {user != null ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <Link
            style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
            to={c.ACCOUNT}
          >
            Account
          </Link>
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
              style={{ height: "100px", width: "auto" }}
              src={taphouselogo}
            ></img>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              style={{
                color: "white",
                marginRight: "50",
              }}
              href={c.LANDING}
            >
              Home
            </Button>
            <Button
              style={{
                color: "white",
                marginRight: "50",
              }}
              href={c.BEER_LIST}
            >
              On Tap
            </Button>
            {/* <Button
              style={{
                color: "white",
                marginRight: "50",
              }}
              href={c.FOOD}
            >
              Food
            </Button> */}
            <Button
              style={{
                color: "white",
                marginRight: "50",
              }}
              href={c.ABOUT}
            >
              About
            </Button>
            {user != null ? (
              <Button
                className={classes.navLinks}
                aria-controls={menuId}
                onClick={handleProfileMenuOpen}
              >
                Account
              </Button>
            ) : (
              <Button style={{ color: "white" }} href={c.SIGN_IN}>
                Sign in
              </Button>
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
