import React from "react";
import { Link } from "react-router-dom";
import taphouselogo from "../../assets/img/taphouselogo.webp";
import * as routes from "../../constants/routes";
import "./index.css";

export default ({ isAuth, onSignInOrSignOut }) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && menuRef.current.contains(event.target)) {
        return;
      }
      setOpenMenu(false);
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const signInSignOut = () => {
    onSignInOrSignOut(false);
  };

  const navItems = [
    <Link key={1} to={routes.LANDING}>
      Home
    </Link>,
    <Link key={2} to={routes.BEER_LIST}>
      On Tap
    </Link>,
    <Link key={3} to={routes.ABOUT}>
      About
    </Link>,
    <span key={4} onClick={() => !isAuth && signInSignOut()}>
      {!isAuth ? "Sign In" : "Account"}
    </span>,
  ];

  return (
    <React.Fragment>
      <div className="nav-bar">
        <Link to={routes.LANDING}>
          <img
            className="taphouse-logo"
            src={taphouselogo}
            alt="Tap House Logo"
          />
        </Link>
        <div className="section-desktop">
          {navItems.map((x) => {
            return x;
          })}
        </div>
        <div className="section-mobile">
          {!openMenu ? (
            <span onClick={() => setOpenMenu(true)}>more</span>
          ) : (
            <ul ref={menuRef}>
              {navItems.map((x, i) => {
                return <li key={i}>{x}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
