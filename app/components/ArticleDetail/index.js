import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function ArticleDetail({ title, authorName, authorImage, body, createdAt, tagList, buttonComponent: ButtonComponent, commentComponent: CommentComponent, comments, isLogin, isCurrentUser, slug, following, favorited, favoritesCount, onToggleFollow, onToggleFavorite, onChangeComment, onPostComment, currentComment }) {
  let id = -1;
  const dateArticle = new Date(createdAt);
  const buttonComponentProps = {
    isCurrentUser,
    slug,
    following,
    favorited,
    favoritesCount,
    authorName,
    isLogin,
    onToggleFollow,
    onToggleFavorite,
  };
  const currentUserImage = localStorage.getItem('userImage');
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{title}</h1>
          <div className="article-meta">
            <NavLink to={`/@${authorName}`}>
              <img src={authorImage} alt="" />
            </NavLink>
            <div className="info">
              <NavLink className="author" to={`/@${authorName}`}>{authorName}</NavLink>
              <span className="date">{`${dateArticle.getDate()}/${dateArticle.getMonth() + 1}/${dateArticle.getFullYear()}`}</span>
            </div>
            <ButtonComponent {...buttonComponentProps} />
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <div>
              <p>{body}</p>
            </div>
            <ul className="tag-list">
              {
                tagList ?
                tagList.map((tag) => {
                  id += 1;
                  return (
                    <li className="tag-default tag-pill tag-outline" key={`tag-${tag}-${id}`}>{tag}</li>
                  );
                })
                : null
              }
            </ul>
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <div className="article-meta">
            <NavLink to={`/@${authorName}`}>
              <img src={authorImage} alt="" />
            </NavLink>
            <div className="info">
              <NavLink to={`/@${authorName}`} className="author">
                {authorName}
              </NavLink>
              <span className="date">January 20th</span>
            </div>
            <ButtonComponent {...buttonComponentProps} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <CommentComponent isLogin={isLogin} image={currentUserImage} onChangeComment={onChangeComment} onPostComment={onPostComment} currentComment={currentComment} />
            {
              comments ?
              comments.map((comment) => {
                const dateComment = new Date(comment.createdAt);
                id += 1;
                return (
                  <div className="card" key={`comment-${comment}-${id}`}>
                    <div className="card-block">
                      <p className="card-text">
                        {comment.body}
                      </p>
                    </div>
                    <div className="card-footer">
                      <NavLink to={`/@${comment.author.username}`} className="comment-author">
                        <img src={comment.author.image} className="comment-author-img" alt="" />
                      </NavLink>
                      &nbsp;
                      <NavLink to={`/@${comment.author.username}`} className="comment-author">{comment.author.username}</NavLink>
                      <span className="date-posted">
                        {`${dateComment.getDate()}/${dateComment.getMonth() + 1}/${dateComment.getFullYear()}`}
                      </span>
                    </div>
                  </div>
                );
              })
              : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

ArticleDetail.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  authorName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  authorImage: PropTypes.oneOfType([
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
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  comments: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  isLogin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  isCurrentUser: PropTypes.bool,
  slug: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  currentComment: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  following: PropTypes.bool,
  favorited: PropTypes.bool,
  favoritesCount: PropTypes.number,
  buttonComponent: PropTypes.func,
  commentComponent: PropTypes.func,
  onToggleFollow: PropTypes.func,
  onToggleFavorite: PropTypes.func,
  onChangeComment: PropTypes.func,
  onPostComment: PropTypes.func,
};

export default ArticleDetail;
