import { createSelector } from 'reselect';

const selectHome = (state) => state.get('homeLogin');

const makeSelectEmail = () => createSelector(
  selectHome,
  (homeState) => homeState.get('email')
);

const makeSelectPassword = () => createSelector(
  selectHome,
  (homeState) => homeState.get('password')
);

export {
  selectHome,
  makeSelectEmail,
  makeSelectPassword,
};
