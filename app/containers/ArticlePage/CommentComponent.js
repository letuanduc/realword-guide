import React from 'react';
import { Link } from 'react-router-dom';

function CommentComponent({ isLogin, image, onChangeComment, onPostComment, currentComment }) {
  let content = (<div></div>);
  if (isLogin) {
    content = (
      <form className="card comment-form" onSubmit={onPostComment}>
        <div className="card-block">
          <textarea className="form-control" placeholder="Write a comment..." rows="3" onChange={onChangeComment} value={currentComment || ''} />
        </div>
        <div className="card-footer">
          <img className="comment-author-img" src={image} alt="" />
          <button className="btn btn-sm btn-primary" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
  } else {
    content = (
      <p>
        <Link to="/login">Sign in</Link>
        {' or'}
        <Link to="/register">sign up</Link>
        {'  to add comments on this article.'}
      </p>
    );
  }
  return content;
}

export default CommentComponent;
