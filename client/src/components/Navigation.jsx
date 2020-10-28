import React from "react";
import { Link, useHistory } from "react-router-dom";
import taphouselogo from "../assets/taphouselogo.webp";
import Bars from "../assets/bars.svg";
import * as routes from "../other/routes";
import AuthContext from "./AuthContext";

export default () => {
  const { isAuth, signInSignOut } = AuthContext.useAuth();
  const history = useHistory();
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
     isAuth && (
      <Link key={4} to={routes.ACCOUNT}>
        Account
      </Link>
    ),
    <span key={5} onClick={() => signInSignOut(false)}>
      {!isAuth ? "Sign In" : "Sign Out"}
    </span>,
  ];

  return (
      <div className="nav-bar" data-test="component-navigation">
          <img className="pointer" onClick={() => history.push(routes.LANDING)} width="70" height="70" src={taphouselogo} alt="Tap House Logo" />
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
  );
};
