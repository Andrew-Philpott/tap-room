import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as routes from "../constants/routes";

export default ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const user = localStorage.getItem("user");
      console.log(user);
      if (!user) {
        return (
          <Redirect
            to={{ pathname: routes.LANDING, state: { from: props.location } }}
          />
        );
      }
      const parsedUser = JSON.parse(user);
      console.log(parsedUser);
      if (roles && roles.indexOf(parsedUser.role) === -1) {
        return <Redirect to={routes.LANDING} />;
      }

      return <Component {...props} />;
    }}
  />
);
