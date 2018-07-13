import { fromJS } from 'immutable';
import {
  FILTER_ARTICLES,
  LOAD_ARTICLES,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLES_ERROR,
  CHANGE_ARTICLES_TAG,
  CHANGE_ARTICLES_OFFSET,
  LOAD_TAGS,
  LOAD_TAGS_SUCCESS,
  LOAD_TAGS_ERROR,
  REMOVE_CURRENT_TAG,
  RESET_OFFSET,
} from './constants';

const initialState = fromJS({
  articlesCat: 'global',                // 3 categories: global, tagged, personal
  article: {
    loading: false,
    error: false,
    articles: false,
    articlesCount: false,
    limit: 10,
    offset: 0,
  },
  tag: {
    tagsList: false,
    currentTag: false,
    loading: false,
    error: false,
  },
});

export default function homeReducer(state = initialState, actions) {
  switch (actions.type) {
    case FILTER_ARTICLES:
      return state.set('articlesCat', actions.filter);
    case LOAD_ARTICLES:
      return state
        .setIn(['article', 'loading'], true)
        .setIn(['article', 'error'], false)
        .setIn(['article', 'articles'], false)
        .setIn(['article', 'articlesCount'], false);
    case LOAD_ARTICLES_SUCCESS:
      return state
        .setIn(['article', 'loading'], false)
        .setIn(['article', 'error'], false)
        .setIn(['article', 'articles'], actions.articles)
        .setIn(['article', 'articlesCount'], actions.total);
    case LOAD_ARTICLES_ERROR:
      return state
        .setIn(['article', 'loading'], false)
        .setIn(['article', 'error'], true)
        .setIn(['article', 'articles'], false)
        .setIn(['article', 'articlesCount'], false);
    case CHANGE_ARTICLES_TAG:
      return state
        .setIn(['tag', 'currentTag'], actions.tag);
    case CHANGE_ARTICLES_OFFSET:
      return state
        .setIn(['article', 'offset'], actions.offset);
    case REMOVE_CURRENT_TAG:
      return state
        .setIn(['tag', 'currentTag'], false);
    case LOAD_TAGS:
      return state
        .setIn(['tag', 'loading'], true)
        .setIn(['tag', 'error'], false)
        .setIn(['tag', 'currentTag'], false)
        .setIn(['tag', 'tagsList'], false);
    case LOAD_TAGS_SUCCESS:
      return state
        .setIn(['tag', 'loading'], false)
        .setIn(['tag', 'error'], false)
        .setIn(['tag', 'currentTag'], false)
        .setIn(['tag', 'tagsList'], actions.tagsList);
    case LOAD_TAGS_ERROR:
      return state
        .setIn(['tag', 'loading'], false)
        .setIn(['tag', 'error'], true)
        .setIn(['tag', 'currentTag'], false)
        .setIn(['tag', 'tagsList'], false);
    case RESET_OFFSET:
      return state
        .setIn(['article', 'offset'], 0);
    default:
      return state;
  }
}
