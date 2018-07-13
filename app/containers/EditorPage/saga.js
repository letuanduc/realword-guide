import { call, select, takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from 'utils/request';
import { ROOT_API } from 'containers/App/constants';
import { makeGetLogin } from '../App/selectors';
import { changeTitle, changeBody, changeDescription, changeTaglist } from './actions';
import { makeGetTitle, makeGetBody, makeGetDescription, makeGetTagList, makeGetMode, makeGetSlug } from './selectors';
import { PUBLISH_ARTICLE, GET_SLUG } from './constants';

function* publishArticle() {
  const title = yield select(makeGetTitle());
  const description = yield select(makeGetDescription());
  const body = yield select(makeGetBody());
  const tagList = yield select(makeGetTagList());
  const mode = yield select(makeGetMode());
  const token = yield select(makeGetLogin());
  const slug = yield select(makeGetSlug());
  let requestURL;
  const options = {
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      article: {
        title,
        description,
        body,
        tagList,
      },
    },
  };
  switch (mode) {
    case 'create':
      requestURL = `${ROOT_API}/articles`;
      options.method = 'post';
      break;
    case 'update':
      requestURL = `${ROOT_API}/articles/${slug}`;
      options.method = 'put';
      break;
    default:
      requestURL = `${ROOT_API}/articles`;
      break;
  }
  options.url = requestURL;
  try {
    const article = yield call(request, options);
    yield put(push(`/article/${article.article.slug}`));
  } catch (error) {
    console.log(error);
  }
}

function* getArticle() {
  const slug = yield select(makeGetSlug());
  try {
    const article = yield call(request, {
      url: `${ROOT_API}/articles/${slug}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    yield put(changeTitle(article.article.title));
    yield put(changeDescription(article.article.description));
    yield put(changeBody(article.article.body));
    yield put(changeTaglist(article.article.tagList));
  } catch (error) {
    console.log(error);
  }
}

export default function* apiDate() {
  yield takeLatest(PUBLISH_ARTICLE, publishArticle);
  yield takeLatest(GET_SLUG, getArticle);
}
