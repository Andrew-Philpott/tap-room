import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default ({ adminRequired, component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  if (!auth.isAuth || (adminRequired === true && !auth.isAdmin)) {
    return <Redirect to={{ pathname: "/", state: { from: rest.location } }} />;
  } else {
    return <Route {...rest} component={Component} />;
  }
};
