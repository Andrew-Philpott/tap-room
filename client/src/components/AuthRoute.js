import React from "react";
import { Route, Redirect } from "react-router-dom";
export default ({ isAuth, isAdmin, ...rest }) => {
  if (!isAuth || (typeof isAdmin === "boolean" && !isAdmin)) {
    return (
      <Redirect to={{ pathname: "/beers", state: { from: rest.location } }} />
    );
  } else {
    return <Route {...rest} />;
  }
};
