import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectFilter = () => createSelector(
  selectHome,
  (homeState) => homeState.get('articlesCat')
);

const makeGetAriticles = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['article', 'articles'])
);

const makeGetArticlesCount = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['article', 'articlesCount'])
);

const makeArticlesLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['article', 'loading'])
);

const makeArticlesError = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['article', 'error'])
);

const makeGetLimit = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['article', 'limit'])
);

const makeGetOffset = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['article', 'offset'])
);

const makeGetArticleTags = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['tag', 'tagsList'])
);

const makeGetCurrentArticlesTag = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['tag', 'currentTag'])
);

const makeGetTagLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['tag', 'loading'])
);

const makeGetTagError = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['tag', 'error'])
);

export {
  selectHome,
  makeSelectFilter,
  makeGetAriticles,
  makeGetArticlesCount,
  makeArticlesLoading,
  makeArticlesError,
  makeGetLimit,
  makeGetOffset,
  makeGetCurrentArticlesTag,
  makeGetArticleTags,
  makeGetTagLoading,
  makeGetTagError,
};
