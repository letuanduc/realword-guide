import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, authed, redirect, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed ?
        <Component {...props} />
        :
        <Redirect to={{ pathname: `/${redirect}`, state: { from: props.location } }} />
    }
    />
  );
}

PrivateRoute.propTypes = {
  authed: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  redirect: PropTypes.string,
  location: PropTypes.any,
  component: PropTypes.any.isRequired,
};
