import {
  CHANGE_TITLE,
  CHANGE_DESCRIPTION,
  CHANGE_BODY,
  CHANGE_TAGLIST,
  PUBLISH_ARTICLE,
  CHANGE_MODE,
  GET_SLUG,
  RESET_ARTICLE,
} from './constants';

export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    title,
  };
}

export function changeDescription(description) {
  return {
    type: CHANGE_DESCRIPTION,
    description,
  };
}

export function changeBody(body) {
  return {
    type: CHANGE_BODY,
    body,
  };
}

export function changeTaglist(tagList) {
  return {
    type: CHANGE_TAGLIST,
    tagList,
  };
}

export function publishArticle() {
  return {
    type: PUBLISH_ARTICLE,
  };
}

export function changeMode(mode) {
  return {
    type: CHANGE_MODE,
    mode,
  };
}

export function getSlug(slug) {
  return {
    type: GET_SLUG,
    slug,
  };
}

export function resetArticle() {
  return {
    type: RESET_ARTICLE,
  };
}
