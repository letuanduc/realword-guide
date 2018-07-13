import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ROOT_API } from 'containers/App/constants';
import request from 'utils/request';
import { makeGetLogin } from 'containers/App/selectors';
import { articleLoaded, commentsLoaded, setFollow, setFavorite, getComment, changeComment } from './actions';
import { makeGetSlug, makeGetFollowing, makeGetAuthorname, makeGetFavorited, makeGetUserComment } from './selectors';
import { ARTICLE_LOADING, TOGGLE_FOLLOW, TOGGLE_FAVORITE, POST_COMMENT, GET_COMMENT } from './constants';

export function* getArticle() {
  const slug = yield select(makeGetSlug());
  const token = yield select(makeGetLogin());
  const requestURL = `${ROOT_API}/articles/${slug}`;

  try {
    let article;
    if (token) {
      article = yield call(request, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        url: requestURL,
      });
    } else {
      article = yield call(request, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        url: requestURL,
      });
    }
    yield put(articleLoaded(article.article));
  } catch (err) {
    console.log(err);
  }
}

function* getComments() {
  const slug = yield select(makeGetSlug());
  const token = yield select(makeGetLogin());
  const requestURL = `${ROOT_API}/articles/${slug}/comments`;

  try {
    let comments;
    if (token) {
      comments = yield call(request, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        url: requestURL,
      });
    } else {
      comments = yield call(request, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        url: requestURL,
      });
    }
    yield put(commentsLoaded(comments.comments));
    yield put(changeComment(false));
  } catch (err) {
    console.log(err);
  }
}

function* toggleFollow() {
  const follow = yield select(makeGetFollowing());
  const token = yield select(makeGetLogin());
  const authorName = yield select(makeGetAuthorname());
  const requestURL = `${ROOT_API}/profiles/${authorName}/follow`;
  try {
    let profile;
    if (follow) {
      profile = yield call(request, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'delete',
        url: requestURL,
      });
    } else {
      profile = yield call(request, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'post',
        url: requestURL,
      });
    }
    yield put(setFollow(profile.profile.following));
  } catch (error) {
    console.log(error);
  }
}

function* toggleFavorite() {
  const favorited = yield select(makeGetFavorited());
  const token = yield select(makeGetLogin());
  const slug = yield select(makeGetSlug());
  const requestURL = `${ROOT_API}/articles/${slug}/favorite`;
  try {
    let article;
    if (favorited) {
      article = yield call(request, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'delete',
        url: requestURL,
      });
    } else {
      article = yield call(request, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'post',
        url: requestURL,
      });
    }
    yield put(setFavorite(article.article.favorited, article.article.favoritesCount));
  } catch (error) {
    console.log(error);
  }
}

function* postComment() {
  const token = yield select(makeGetLogin());
  const slug = yield select(makeGetSlug());
  const userComment = yield select(makeGetUserComment());
  const requestURL = `${ROOT_API}/articles/${slug}/comments`;
  try {
    yield call(request, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      method: 'post',
      url: requestURL,
      data: {
        comment: {
          body: userComment,
        },
      },
    });
    yield put(getComment());
  } catch (error) {
    console.log(error);
  }
}

export default function* apiData() {
  yield takeLatest(ARTICLE_LOADING, getArticle);
  yield takeLatest(ARTICLE_LOADING, getComments);
  yield takeLatest(TOGGLE_FOLLOW, toggleFollow);
  yield takeLatest(TOGGLE_FAVORITE, toggleFavorite);
  yield takeLatest(POST_COMMENT, postComment);
  yield takeLatest(GET_COMMENT, getComments);
}
