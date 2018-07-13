import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { push } from 'react-router-redux';

import { logout } from 'containers/App/actions';

import { changeImage, changeUsername, changeBio, changeEmail, changePassword, getInfo, updateUser } from './actions';
import { makeGetImge, makeGetUsername, makeGetBio, makeGetEmail } from './selectors';
import saga from './saga';
import reducer from './reducers';

export class SettingPage extends PureComponent {  // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadInfo();
  }

  render() {
    const { image, username, bio, email, onChangeImage, onChangeUsername, onChangeBio, onChangeEmail, onChangePassword, onLogout, onSubmit } = this.props;
    return (
      <div className="settings-page">
        <Helmet>
          <title>Settings</title>
        </Helmet>
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              <form onSubmit={onSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input className="form-control" type="text" placeholder="URL of profile picture" value={image || ''} onChange={onChangeImage} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="text" placeholder="Your Name" value={username || ''} onChange={onChangeUsername} />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea className="form-control form-control-lg" rows="8" placeholder="Short bio about you" value={bio || ''} onChange={onChangeBio} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="text" placeholder="Email" value={email || ''} onChange={onChangeEmail} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="password" placeholder="New password" onChange={onChangePassword} />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <button className="btn btn-outline-danger" onClick={onLogout} >
                Or click here to logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SettingPage.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  username: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  bio: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  email: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  loadInfo: PropTypes.func,
  onChangeBio: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangeImage: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangeUsername: PropTypes.func,
  onLogout: PropTypes.func,
  onSubmit: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    loadInfo: () => dispatch(getInfo()),
    onChangeImage: (e) => dispatch(changeImage(e.target.value)),
    onChangeUsername: (e) => dispatch(changeUsername(e.target.value)),
    onChangeBio: (e) => dispatch(changeBio(e.target.value)),
    onChangeEmail: (e) => dispatch(changeEmail(e.target.value)),
    onChangePassword: (e) => dispatch(changePassword(e.target.value)),
    onLogout: () => {
      dispatch(logout());
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userImage');
      dispatch(push('/'));
    },
    onSubmit: (e) => {
      e.preventDefault();
      dispatch(updateUser());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  image: makeGetImge(),
  email: makeGetEmail(),
  bio: makeGetBio(),
  username: makeGetUsername(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homeSetting', reducer });
const withSaga = injectSaga({ key: 'homeSetting', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingPage);
