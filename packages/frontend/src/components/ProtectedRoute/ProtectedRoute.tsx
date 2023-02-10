import React from "react";
import { Redirect, Route } from "react-router-dom";

import { ACCESS_TOKEN } from "../../constants/localStorage";
import { LOGIN_PATH } from "../../constants/paths";

interface ProtectedRouteProps {
  component: any;
  path: string;
  exact?: boolean;
}

function ProtectedRoute({ component, path, exact }: ProtectedRouteProps) {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props: any) => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
          return React.createElement(component, props);
        }
        return (
          <Redirect
            to={{
              pathname: `${LOGIN_PATH}`,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

ProtectedRoute.defaultProps = {
  exact: false,
};

export default ProtectedRoute;
