import { createSelector } from 'reselect';

const selectHome = (state) => state.get('homeRegister');

const makeSelectEmail = () => createSelector(
  selectHome,
  (homeState) => homeState.get('email')
);

const makeSelectPassword = () => createSelector(
  selectHome,
  (homeState) => homeState.get('password')
);

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

export {
  selectHome,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectUsername,
};
