import React from "react";
import { Link } from "react-router-dom";
import taphouselogo from "../images/taphouselogo.webp";
import Bars from "../svg/bars.svg";
import useAuth from "./use-auth";
import * as routes from "../constants/routes";
import "../css/navigation.css";

export default () => {
  const { auth, signIn, signOut } = useAuth();
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
    !auth.isAuth ? signIn(false) : signOut();
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
    auth.isAuth && (
      <Link key={4} to={routes.ACCOUNT}>
        Account
      </Link>
    ),
    <span key={5} onClick={() => signInSignOut()}>
      {!auth.isAuth ? "Sign In" : "Sign Out"}
    </span>,
  ];

  return (
    <React.Fragment>
      <div className="nav-bar">
        <Link to={routes.LANDING}>
          <img width="70" height="70" src={taphouselogo} alt="Tap House Logo" />
        </Link>
        <div className="section-desktop">
          {navItems.map((x) => {
            return x;
          })}
        </div>
        <div className="section-mobile">
          {!openMenu ? (
            <img
              height="30"
              width="30"
              onClick={() => setOpenMenu(true)}
              src={Bars}
              alt=""
            />
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
