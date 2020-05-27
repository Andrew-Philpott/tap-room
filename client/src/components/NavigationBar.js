import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Button } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import taphouselogo from "../../assets/img/taphouselogo.png";
import * as c from "../constants/routes";
import { useSelector } from "react-redux";
import { useStyles } from "../components/use-styles";

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
      <Link className={classes.menuLink} to={c.ACCOUNT}>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Link>
      <MenuItem onClick={handleMenuClose}>
        <Button className={classes.menuLink} href={c.LOG_OUT}>
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
      <Link className={classes.menuLink} to={c.LANDING}>
        <MenuItem>Home</MenuItem>
      </Link>
      <Link className={classes.menuLink} to={c.BEER_LIST}>
        <MenuItem>On Tap</MenuItem>
      </Link>
      <Link className={classes.menuLink} to={c.ABOUT}>
        <MenuItem>About</MenuItem>
      </Link>
      {user == null ? (
        <Link className={classes.menuLink} to={c.LOG_IN}>
          <MenuItem>Log in</MenuItem>
        </Link>
      ) : (
        <Link className={classes.menuLink} to={c.LOG_OUT}>
          <MenuItem>Log out</MenuItem>
        </Link>
      )}
      {user != null ? (
        <Link className={classes.menuLink} to={c.ACCOUNT}>
          <MenuItem onClick={handleProfileMenuOpen}>Account</MenuItem>
        </Link>
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
            <Button className={classes.navButton} href={c.LANDING}>
              Home
            </Button>
            <Button className={classes.navButton} href={c.BEER_LIST}>
              On Tap
            </Button>
            <Button className={classes.navButton} href={c.ABOUT}>
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
              <Button style={{ color: "white" }} href={c.LOG_IN}>
                Log in
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
