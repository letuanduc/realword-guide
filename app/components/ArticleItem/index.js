import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import Favorite from './favoriteCount';

function ArticleItem({ article, onToggleFavorite }) {
  const date = new Date(article.createdAt);
  const createdDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const tagList = article.tagList.map((tag) => (
    <li className="tag-default tag-pill tag-outline" key={`tagName-${tag}`}>{tag}</li>
  ));
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt="" />
        </Link>
        <div className="info">
          <NavLink to={`/@${article.author.username}`} className="author">
            {article.author.username}
          </NavLink>
          <span className="date">{createdDate}</span>
        </div>
        <Favorite slug={article.slug} count={article.favoritesCount} favorited={article.favorited} onToggleFavorite={onToggleFavorite} />
      </div>
      <NavLink to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {tagList}
        </ul>
      </NavLink>
    </div>
  );
}

ArticleItem.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    favoritesCount: PropTypes.number,
    favorited: PropTypes.bool,
  }),
  onToggleFavorite: PropTypes.func,
};

export default ArticleItem;
