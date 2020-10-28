import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default ({component:Component, ...rest }) => {
  const { isAuth, isAdmin } = useAuth();
  if (!isAuth || (typeof isAdmin === "boolean" && !isAdmin)) {
    return <Redirect to={{ pathname: "/", state: { from: rest.location } }} />;
  } else {
    return <Route {...rest}>
      <Component />
    </Route>;
  }
};
