import {
  FILTER_ARTICLES,
  LOAD_ARTICLES,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLES_ERROR,
  CHANGE_ARTICLES_OFFSET,
  LOAD_TAGS,
  LOAD_TAGS_SUCCESS,
  LOAD_TAGS_ERROR,
  CHANGE_ARTICLES_TAG,
  REMOVE_CURRENT_TAG,
  RESET_OFFSET,
  TOGGLE_FAVORITE,
} from './constants';

export function loadArticles() {
  return {
    type: LOAD_ARTICLES,
  };
}

export function articlesLoaded(articles, total) {
  return {
    type: LOAD_ARTICLES_SUCCESS,
    articles,
    total,
  };
}

export function articleLoadingError(error) {
  return {
    type: LOAD_ARTICLES_ERROR,
    error,
  };
}

export function filterArticles(filter) {
  return {
    type: FILTER_ARTICLES,
    filter,
  };
}

export function changeOffset(offset) {
  return {
    type: CHANGE_ARTICLES_OFFSET,
    offset,
  };
}

export function loadTags() {
  return {
    type: LOAD_TAGS,
  };
}

export function tagLoaded(tagsList) {
  return {
    type: LOAD_TAGS_SUCCESS,
    tagsList,
  };
}

export function tagLoadingError(error) {
  return {
    type: LOAD_TAGS_ERROR,
    error,
  };
}

export function changeCurrentTag(tag) {
  return {
    type: CHANGE_ARTICLES_TAG,
    tag,
  };
}

export function removeCurrentTag() {
  return {
    type: REMOVE_CURRENT_TAG,
  };
}

export function resetOffset() {
  return {
    type: RESET_OFFSET,
  };
}

export function toggleFavorite(slug, favorited) {
  return {
    type: TOGGLE_FAVORITE,
    slug,
    favorited,
  };
}
