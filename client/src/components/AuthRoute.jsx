import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default ({adminRequired, ...rest }) => {
  const { isAuth, isAdmin } = useAuth();
  if (!isAuth || (adminRequired === true && !isAdmin)) {
    return <Redirect to={{ pathname: "/", state: { from: rest.location } }} />;
  } else {
    return <Route {...rest}/>
  }
};
