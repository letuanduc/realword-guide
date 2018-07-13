import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeGetLogin } from 'containers/App/selectors';
import { userLogin } from '../../App/actions';
import { changeEmail, changePassword } from './action';
import reducer from './reducer';
import saga from './saga';

function LoginPage({ onChangeEmail, onChangePassword, onSubmitForm, isLogin }) {
  if (isLogin) {
    return <Redirect to="/" />;
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>
            <ul className="error-messages" style={{ display: 'none' }}>
              <li>That email is already taken</li>
            </ul>
            <form onSubmit={onSubmitForm}>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="text" placeholder="Email" onChange={onChangeEmail} />
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="password" placeholder="Password" onChange={onChangePassword} />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onSubmitForm: PropTypes.func,
  isLogin: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: (e) => dispatch(changeEmail(e.target.value)),
    onChangePassword: (e) => dispatch(changePassword(e.target.value)),
    onSubmitForm: (e) => {
      e.preventDefault();
      dispatch(userLogin());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  isLogin: makeGetLogin(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homeLogin', reducer });
const withSaga = injectSaga({ key: 'homeLogin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
