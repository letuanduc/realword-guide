import { ARTICLE_LOADING, ARTICLE_LOADED, COMMENTS_LOADED, GET_SLUG, RESET_INFO, TOGGLE_FOLLOW, SET_FOLLOW, SET_FAVORITED, TOGGLE_FAVORITE, POST_COMMENT, CHANGE_COMMENT, GET_COMMENT } from './constants';

export function articleLoading() {
  return {
    type: ARTICLE_LOADING,
  };
}

export function articleLoaded(article) {
  return {
    type: ARTICLE_LOADED,
    article,
  };
}

export function commentsLoaded(comments) {
  return {
    type: COMMENTS_LOADED,
    comments,
  };
}

export function getSlug(slug) {
  return {
    type: GET_SLUG,
    slug,
  };
}

export function resetInfo() {
  return {
    type: RESET_INFO,
  };
}

export function toggleFollow() {
  return {
    type: TOGGLE_FOLLOW,
  };
}

export function setFollow(follow) {
  return {
    type: SET_FOLLOW,
    follow,
  };
}

export function toggleFavorite() {
  return {
    type: TOGGLE_FAVORITE,
  };
}

export function setFavorite(favorited, favoritesCount) {
  return {
    type: SET_FAVORITED,
    favorited,
    favoritesCount,
  };
}

export function changeComment(comment) {
  return {
    type: CHANGE_COMMENT,
    comment,
  };
}

export function postComment() {
  return {
    type: POST_COMMENT,
  };
}

export function getComment() {
  return {
    type: GET_COMMENT,
  };
}
