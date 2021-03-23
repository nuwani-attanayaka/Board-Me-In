import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";

const OwnerRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().role === 2 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/ownerlogin" />
        )
      }
    />
  );
};

export default OwnerRoute;
