import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";

const GuestRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().role === 3 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/guestlogin" />
        )
      }
    />
  );
};

export default GuestRoute;
