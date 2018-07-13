import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import ArticleDetail from 'components/ArticleDetail';
import { makeGetLogin, makeGetUserName } from 'containers/App/selectors';
import ButtonComponent from './ButtonComponent';
import CommentComponent from './CommentComponent';
import { getSlug, articleLoading, resetInfo, toggleFollow, toggleFavorite, changeComment, postComment } from './actions';
import { makeGetTitle, makeGetBody, makeGetCreatedAt, makeGetTagList, makeGetFavorited, makeGetFavoritesCount, makeGetAuthorname, makeGetImage, makeGetFollowing, makeGetComments, makeGetUserComment } from './selectors';
import saga from './saga';
import reducer from './reducers';

export default function ArticlePageRoute({ match }) {
  return (
    <div>
      <Route path={`${match.url}/:slug`} component={MainArticlePage} />
      <Route exact path={match.url} render={() => <Redirect to="/" />} />
    </div>
  );
}

ArticlePageRoute.propTypes = {
  match: PropTypes.object,
};

class ArticlePage extends PureComponent {  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.getSlug(slug);
    this.props.getArticle();
  }

  componentWillUnmount() {
    this.props.resetInfo();
  }

  render() {
    const { title, createdAt, body, tagList, favorited, favoritesCount, authorName, image, following, comments, match, isLogin, currentUserName, onToggleFollow, onToggleFavorite, onChangeComment, onPostComment, currentComment } = this.props;
    const slug = match.params.slug;
    const articleDetailProps = {
      title,
      body,
      createdAt,
      tagList,
      favorited,
      favoritesCount,
      authorName,
      authorImage: image,
      following,
      comments,
      isLogin,
      slug,
      isCurrentUser: authorName === currentUserName,
      buttonComponent: ButtonComponent,
      commentComponent: CommentComponent,
      onToggleFollow,
      onToggleFavorite,
      onChangeComment,
      onPostComment,
      currentComment,
    };
    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <ArticleDetail {...articleDetailProps} />
      </div>
    );
  }
}

ArticlePage.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  tagList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  favorited: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  favoritesCount: PropTypes.number,
  authorName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  following: PropTypes.bool,
  comments: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  isLogin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  currentUserName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  currentComment: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  match: PropTypes.object,
  getSlug: PropTypes.func,
  getArticle: PropTypes.func,
  resetInfo: PropTypes.func,
  onToggleFollow: PropTypes.func,
  onToggleFavorite: PropTypes.func,
  onChangeComment: PropTypes.func,
  onPostComment: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    getSlug: (slug) => {
      dispatch(getSlug(slug));
    },
    getArticle: () => dispatch(articleLoading()),
    resetInfo: () => dispatch(resetInfo()),
    onToggleFollow: () => dispatch(toggleFollow()),
    onToggleFavorite: () => dispatch(toggleFavorite()),
    onChangeComment: (e) => dispatch(changeComment(e.target.value)),
    onPostComment: (e) => {
      e.preventDefault();
      dispatch(postComment());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  title: makeGetTitle(),
  createdAt: makeGetCreatedAt(),
  body: makeGetBody(),
  tagList: makeGetTagList(),
  favorited: makeGetFavorited(),
  favoritesCount: makeGetFavoritesCount(),
  authorName: makeGetAuthorname(),
  image: makeGetImage(),
  following: makeGetFollowing(),
  comments: makeGetComments(),
  isLogin: makeGetLogin(),
  currentUserName: makeGetUserName(),
  currentComment: makeGetUserComment(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homeArticle', reducer });
const withSaga = injectSaga({ key: 'homeArticle', saga });

const MainArticlePage = compose(
  withReducer,
  withSaga,
  withConnect,
)(ArticlePage);
