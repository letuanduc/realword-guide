import { fromJS } from 'immutable';
import {
  CHANGE_TITLE,
  CHANGE_DESCRIPTION,
  CHANGE_BODY,
  CHANGE_TAGLIST,
  CHANGE_MODE,
  GET_SLUG,
  RESET_ARTICLE,
} from './constants';
const initialState = fromJS({
  mode: 'create',                // create or update
  title: false,
  description: false,
  body: false,
  tagList: false,
  slug: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MODE:
      return state
        .set('mode', action.mode);
    case CHANGE_TITLE:
      return state
        .set('title', action.title);
    case CHANGE_DESCRIPTION:
      return state
        .set('description', action.description);
    case CHANGE_BODY:
      return state
        .set('body', action.body);
    case CHANGE_TAGLIST:
      return state
        .set('tagList', action.tagList);
    case GET_SLUG:
      return state
        .set('slug', action.slug);
    case RESET_ARTICLE:
      return state
        .set('mode', 'create')
        .set('title', false)
        .set('description', false)
        .set('body', false)
        .set('tagList', false)
        .set('slug', false);
    default:
      return state;
  }
}

export default appReducer;
