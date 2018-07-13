import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

class Header extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const isLogin = this.props.isLogin;
    const username = this.props.username;
    const src = this.props.src;
    return (
      <NavBar isLogin={isLogin} username={username} src={src} />
    );
  }
}

Header.propTypes = {
  isLogin: PropTypes.string,
  username: PropTypes.string,
  src: PropTypes.string,
};

export default Header;
