import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ROOT_API } from 'containers/App/constants';
import request from 'utils/request';
import { makeGetLogin } from 'containers/App/selectors';
import { articlesLoaded, articleLoadingError, tagLoaded, tagLoadingError } from './actions';
import { makeGetLimit, makeGetOffset, makeSelectFilter, makeGetCurrentArticlesTag } from './selector';
import { LOAD_ARTICLES, LOAD_TAGS, TOGGLE_FAVORITE } from './constants';

export function* getArticles() {
  const limit = yield select(makeGetLimit());
  const offset = yield select(makeGetOffset());
  const filter = yield select(makeSelectFilter());
  const tag = yield select(makeGetCurrentArticlesTag());
  const token = yield select(makeGetLogin());
  let requestURL;
  switch (filter) {
    case 'personal':
      requestURL = `${ROOT_API}/articles/feed?limit=${limit}&offset=${offset}`;
      break;
    case 'tagged':
      requestURL = `${ROOT_API}/articles?tag=${tag}&limit=${limit}&offset=${offset}`;
      break;
    default:
      requestURL = `${ROOT_API}/articles?limit=${limit}&offset=${offset}`;
      break;
  }

  try {
    let articles;
    if (token) {
      articles = yield call(request, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        url: requestURL,
      });
    } else {
      articles = yield call(request, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        url: requestURL,
      });
    }
    const listArticles = articles.articles.length ? articles.articles : false;
    yield put(articlesLoaded(listArticles, articles.articlesCount));
  } catch (err) {
    yield put(articleLoadingError(err));
  }
}

function* getTags() {
  const requestURL = `${ROOT_API}/tags`;

  try {
    const tags = yield call(request, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: requestURL,
    });
    yield put(tagLoaded(tags.tags));
  } catch (error) {
    yield put(tagLoadingError(error));
  }
}

function* toggleFavorite(action) {
  const favorited = action.favorited;
  const token = yield select(makeGetLogin());
  const slug = action.slug;
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
    yield call(getArticles);
  } catch (error) {
    console.log(error);
  }
}

export default function* apiData() {
  yield takeLatest(LOAD_ARTICLES, getArticles);
  yield takeLatest(LOAD_TAGS, getTags);
  yield takeLatest(TOGGLE_FAVORITE, toggleFavorite);
}
