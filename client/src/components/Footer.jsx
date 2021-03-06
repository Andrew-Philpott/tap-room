import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../other/routes";

export default () => {
  return (
    <footer data-test="component-footer">
      <Link to={routes.LANDING}>Home</Link>
      <Link to={routes.BEER_LIST}>On Tap</Link>
      <Link to={routes.ABOUT}>About</Link>
    </footer>
  );
};
