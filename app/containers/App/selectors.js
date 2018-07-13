import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeGetLogin = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['user', 'jwtToken'])
);

const makeGetUserName = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['user', 'username'])
);

export {
  makeSelectLocation,
  makeGetUserName,
  makeGetLogin,
};
