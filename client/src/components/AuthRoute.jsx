import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./AuthContext";

export default ({adminRequired, ...rest}) => {
  const { isAuth, isAdmin } = AuthContext.useAuth();
  if (!isAuth || (adminRequired === true && !isAdmin)) {
    return <Redirect to={{ pathname: "/", state: { from: rest.location } }} />;
  } else {
    return <Route {...rest}/>
  }
};
