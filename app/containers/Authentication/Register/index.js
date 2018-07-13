import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { userLogin } from '../../App/actions';
import { changeEmail, changePassword, changeUsername } from './actions';
import reducer from './reducers';
import saga from './saga';

function RegisterPage({ onChangeUsername, onChangePassword, onSubmitForm, onChangeEmail }) {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>
            <ul className="error-messages" style={{ display: 'none' }}>
              <li>That email is already taken</li>
            </ul>
            <form onSubmit={onSubmitForm}>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="text" placeholder="Your Name" onChange={onChangeUsername} />
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="text" placeholder="Email" onChange={onChangeEmail} />
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="password" placeholder="Password" onChange={onChangePassword} />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

RegisterPage.propTypes = {
  onChangeUsername: PropTypes.func,
  onChangePassword: PropTypes.func,
  onSubmitForm: PropTypes.func,
  onChangeEmail: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (e) => dispatch(changeUsername(e.target.value)),
    onChangePassword: (e) => dispatch(changePassword(e.target.value)),
    onChangeEmail: (e) => dispatch(changeEmail(e.target.value)),
    onSubmitForm: (e) => {
      e.preventDefault();
      dispatch(userLogin());
    },
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homeRegister', reducer });
const withSaga = injectSaga({ key: 'homeRegister', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegisterPage);
