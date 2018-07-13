import React from 'react';
import PropTypes from 'prop-types';

import ArticleItem from 'components/ArticleItem';

function ListArticles({ articles, loading, error, children, onToggleFavorite }) {
  let content = (<div></div>);
  let list = (<li></li>);
  if (loading) {
    content = (<div className="article-preview">Loading articles ...</div>);
  } else if (articles !== false) {
    list = articles.map((article) => (
      <ArticleItem key={`article-${article.slug}`} article={article} onToggleFavorite={onToggleFavorite} />
    ));
    content = (
      <div>
        {list}
        {children}
      </div>
    );
  } else {
    content = (<div className="article-preview">Ủa làm méo có bài nào !!</div>);
  }
  if (error !== false) {
    content = (<div className="article-preview">Móa có lỗi rồi</div>);
  }

  return content;
}

ListArticles.propTypes = {
  articles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

export default ListArticles;
