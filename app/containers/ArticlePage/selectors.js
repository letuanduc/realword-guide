import { createSelector } from 'reselect';

const selectHome = (state) => state.get('homeArticle');

const makeGetTitle = () => createSelector(
  selectHome,
  (homeState) => homeState.get('title')
);

const makeGetCreatedAt = () => createSelector(
  selectHome,
  (homeState) => homeState.get('createdAt')
);

const makeGetBody = () => createSelector(
  selectHome,
  (homeState) => homeState.get('body')
);

const makeGetTagList = () => createSelector(
  selectHome,
  (homeState) => homeState.get('tagList')
);

const makeGetFavorited = () => createSelector(
  selectHome,
  (homeState) => homeState.get('favorited')
);

const makeGetFavoritesCount = () => createSelector(
  selectHome,
  (homeState) => homeState.get('favoritesCount')
);

const makeGetAuthorname = () => createSelector(
  selectHome,
  (homeState) => homeState.get('authorName')
);

const makeGetImage = () => createSelector(
  selectHome,
  (homeState) => homeState.get('image')
);

const makeGetFollowing = () => createSelector(
  selectHome,
  (homeState) => homeState.get('following')
);

const makeGetComments = () => createSelector(
  selectHome,
  (homeState) => homeState.get('comments')
);

const makeGetSlug = () => createSelector(
  selectHome,
  (homeState) => homeState.get('slug')
);

const makeGetUserComment = () => createSelector(
  selectHome,
  (homeState) => homeState.get('userComment')
);

export {
  makeGetTitle,
  makeGetBody,
  makeGetCreatedAt,
  makeGetTagList,
  makeGetFavorited,
  makeGetFavoritesCount,
  makeGetAuthorname,
  makeGetImage,
  makeGetFollowing,
  makeGetComments,
  makeGetSlug,
  makeGetUserComment,
};
