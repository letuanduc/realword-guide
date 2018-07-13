import { createSelector } from 'reselect';

const selectHome = (state) => state.get('homeEditor');

const makeGetTitle = () => createSelector(
  selectHome,
  (homeState) => homeState.get('title')
);

const makeGetDescription = () => createSelector(
  selectHome,
  (homeState) => homeState.get('description')
);

const makeGetBody = () => createSelector(
  selectHome,
  (homeState) => homeState.get('body')
);

const makeGetTagList = () => createSelector(
  selectHome,
  (homeState) => homeState.get('tagList')
);

const makeGetMode = () => createSelector(
  selectHome,
  (homeState) => homeState.get('mode')
);

const makeGetSlug = () => createSelector(
  selectHome,
  (homeState) => homeState.get('slug')
);

export {
  makeGetTitle,
  makeGetBody,
  makeGetDescription,
  makeGetTagList,
  makeGetMode,
  makeGetSlug,
};
