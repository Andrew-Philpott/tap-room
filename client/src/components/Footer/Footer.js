import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import "./index.css";

export default () => {
  return (
    <footer>
      <Button component={Link} to={routes.LANDING}>
        Home
      </Button>
      <Button component={Link} to={routes.BEER_LIST}>
        On Tap
      </Button>
      <Button component={Link} to={routes.ABOUT}>
        About
      </Button>
    </footer>
  );
};
