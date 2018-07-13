import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

function NavBar({ isLogin, username, src }) {
  let content = (<div></div>);

  if (isLogin) {
    content = (
      <nav className="navbar navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">conduit</NavLink>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/editor">
                <i className="ion-compose"></i>
                &nbsp;New Article
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/settings">
                <i className="ion-gear-a"></i>
                &nbsp;Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/@${username}`}>
                <img src={src} className="user-pic" alt="" />
                {username}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    content = (
      <nav className="navbar navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">conduit</NavLink>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                <i className="ion-compose"></i>
                &nbsp;Sign In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                <i className="ion-gear-a"></i>
                &nbsp;Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return content;
}

NavBar.PropTypes = {
  isLogin: PropTypes.string,
  username: PropTypes.string,
};

export default NavBar;
