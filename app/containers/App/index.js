/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import parseJwt from 'utils/parseJwt';

import Header from 'components/Header';
import HomePage from 'containers/HomePage/Loadable';
import SettingPage from 'containers/SettingPage/Loadable';
import ArticlePage from 'containers/ArticlePage/Loadable';
import LoginPage from 'containers/Authentication/Login/Loadable';
import RegisterPage from 'containers/Authentication/Register/Loadable';
import EditorPage from 'containers/EditorPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import PrivateRoute from './PrivateRoute';
import { login } from './actions';

function App({ dispatch }) {
  const token = localStorage.getItem('jwtToken');
  const image = localStorage.getItem('userImage');
  let info;
  if (token) {
    info = parseJwt(token);
    dispatch(login(token, info.username));
  }
  return (
    <div>
      <Header isLogin={token} username={info ? info.username : ''} src={image} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute authed={token} path="/editor" redirect="login" component={EditorPage} />
        <PrivateRoute authed={token} path="/settings" redirect="login" component={SettingPage} />
        <Route path="/article" component={ArticlePage} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute authed={token ? null : true} path="/register" redirect="" component={RegisterPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

App.propTypes = {
  dispatch: PropTypes.func,
};

export default withRouter(connect()(App));
