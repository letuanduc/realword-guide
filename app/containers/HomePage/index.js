/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { makeGetLogin } from 'containers/App/selectors';
import ListArticles from 'components/ListArticles';
import Pagination from 'components/Pagination';
import TagsList from './TagsList';
import { makeGetAriticles, makeArticlesLoading, makeArticlesError, makeSelectFilter, makeGetArticlesCount, makeGetOffset, makeGetLimit, makeGetArticleTags, makeGetTagLoading, makeGetTagError, makeGetCurrentArticlesTag } from './selector';
import { loadArticles, filterArticles, changeOffset, loadTags, removeCurrentTag, changeCurrentTag, resetOffset, toggleFavorite } from './actions';
import NavBar from './NavBar';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import saga from './saga';
import reducer from './reducer';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    if (this.props.isLogin) {
      this.props.setFilter('personal');
    } else {
      this.props.setFilter('global');
    }
  }

  componentDidMount() {
    this.props.loadArticles();
    this.props.loadTags();
  }

  render() {
    const { articles, loading, error, isLogin, filter, onFilterArticles, tag, articlesCount, onPaging, offset, limit, tagsList, tagLoading, TagError, setTag, onToggleFavorite } = this.props;
    const articlesListProps = {
      articles,
      loading,
      error,
      onToggleFavorite,
    };
    const tagsListProps = {
      tagsList,
      tagLoading,
      TagError,
      onClick: setTag,
    };
    return (
      <div className="home-page">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="banner" style={{ display: isLogin ? 'none' : 'block' }}>
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <NavBar
                isLogin={isLogin}
                filter={filter}
                onClick={onFilterArticles}
                tag={tag}
              />
              <ListArticles {...articlesListProps}>
                <Pagination articlesCount={articlesCount} onClick={onPaging} currentOffset={offset} limit={limit} />
              </ListArticles>
            </div>
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <TagsList {...tagsListProps} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  articles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  loadArticles: PropTypes.func,
  isLogin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  filter: PropTypes.string,
  onFilterArticles: PropTypes.func,
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  tagsList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  loadTags: PropTypes.func,
  tagLoading: PropTypes.bool,
  TagError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  setFilter: PropTypes.func,
  articlesCount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  setTag: PropTypes.func,
  onPaging: PropTypes.func,
  offset: PropTypes.number,
  limit: PropTypes.number,
  onToggleFavorite: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    loadArticles: () => dispatch(loadArticles()),
    loadTags: () => dispatch(loadTags()),
    onFilterArticles: (filter, currentFilter) => {
      if (filter !== currentFilter) {
        dispatch(filterArticles(filter));
        dispatch(loadArticles());
        dispatch(removeCurrentTag());
        dispatch(resetOffset());
      }
    },
    setFilter: (filter) => {
      dispatch(resetOffset());
      dispatch(filterArticles(filter));
    },
    onPaging: (offset, currentOffset) => {
      if (offset !== currentOffset) {
        dispatch(changeOffset(offset));
        dispatch(loadArticles());
      }
    },
    setTag: (tag) => {
      dispatch(resetOffset());
      dispatch(changeCurrentTag(tag));
      dispatch(filterArticles('tagged'));
      dispatch(loadArticles());
    },
    onToggleFavorite: (slug, favorited) => dispatch(toggleFavorite(slug, favorited)),
  };
}

const mapStateToProps = createStructuredSelector({
  articles: makeGetAriticles(),
  articlesCount: makeGetArticlesCount(),
  loading: makeArticlesLoading(),
  error: makeArticlesError(),
  isLogin: makeGetLogin(),
  filter: makeSelectFilter(),
  tag: makeGetCurrentArticlesTag(),
  tagsList: makeGetArticleTags(),
  tagLoading: makeGetTagLoading(),
  TagError: makeGetTagError(),
  offset: makeGetOffset(),
  limit: makeGetLimit(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
