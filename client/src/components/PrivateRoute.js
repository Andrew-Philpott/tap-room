import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as routes from "../constants/routes";

export const PrivateRoute = ({
  component: Component,
  user,
  roles,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (!user) {
        return (
          <Redirect
            to={{ pathname: routes.LANDING, state: { from: props.location } }}
          />
        );
      }

      if (roles && roles.indexOf(user.role) === -1) {
        return <Redirect to={routes.LANDING} />;
      }

      return <Component user={user} {...props} />;
    }}
  />
);
