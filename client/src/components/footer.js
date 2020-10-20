import React from "react";
import { Link } from "react-router-dom";
import { LANDING, BEER_LIST, ABOUT } from "../constants/routes";

export default () => {
  return (
    <footer>
      <Link to={LANDING}>Home</Link>
      <Link to={BEER_LIST}>On Tap</Link>
      <Link to={ABOUT}>About</Link>
    </footer>
  );
};
