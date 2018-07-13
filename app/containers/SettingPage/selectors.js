import { createSelector } from 'reselect';

const selectHome = (state) => state.get('homeSetting');

const makeGetImge = () => createSelector(
  selectHome,
  (homeState) => homeState.get('image')
);

const makeGetUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const makeGetBio = () => createSelector(
  selectHome,
  (homeState) => homeState.get('bio')
);

const makeGetEmail = () => createSelector(
  selectHome,
  (homeState) => homeState.get('email')
);

const makeGetPassword = () => createSelector(
  selectHome,
  (homeState) => homeState.get('password')
);

export {
  makeGetImge,
  makeGetUsername,
  makeGetBio,
  makeGetEmail,
  makeGetPassword,
};
