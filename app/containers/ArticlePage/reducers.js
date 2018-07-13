import { fromJS } from 'immutable';
import { ARTICLE_LOADED, COMMENTS_LOADED, GET_SLUG, RESET_INFO, SET_FOLLOW, SET_FAVORITED, CHANGE_COMMENT } from './constants';

const initialState = fromJS({
  title: false,
  body: false,
  createdAt: false,
  tagList: false,
  favorited: false,
  favoritesCount: 0,
  authorName: false,
  image: false,
  following: false,
  comments: false,
  slug: false,
  userComment: false,
});

export default function homeState(state = initialState, action) {
  switch (action.type) {
    case ARTICLE_LOADED:
      return state
        .set('title', action.article.title)
        .set('body', action.article.body)
        .set('createdAt', action.article.createdAt)
        .set('tagList', action.article.tagList)
        .set('favorited', action.article.favorited)
        .set('favoritesCount', action.article.favoritesCount)
        .set('authorName', action.article.author.username)
        .set('image', action.article.author.image)
        .set('following', action.article.author.following);
    case COMMENTS_LOADED:
      return state
        .set('comments', action.comments);
    case GET_SLUG:
      return state
        .set('slug', action.slug);
    case RESET_INFO:
      return state
        .set('title', false)
        .set('body', false)
        .set('createdAt', false)
        .set('tagList', false)
        .set('favorited', false)
        .set('favoritesCount', 0)
        .set('authorName', false)
        .set('image', false)
        .set('following', false)
        .set('comments', false)
        .set('slug', false);
    case SET_FOLLOW:
      return state
        .set('following', action.follow);
    case SET_FAVORITED:
      return state
        .set('favorited', action.favorited)
        .set('favoritesCount', action.favoritesCount);
    case CHANGE_COMMENT:
      return state
        .set('userComment', action.comment);
    default:
      return state;
  }
}
