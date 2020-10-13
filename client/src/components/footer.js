import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import "./index.css";

export default () => {
  return (
    <footer>
      <Link to={routes.LANDING}>Home</Link>
      <Link to={routes.BEER_LIST}>On Tap</Link>
      <Link to={routes.ABOUT}>About</Link>
    </footer>
  );
};
