import React from 'react';
import { NavLink } from 'react-router-dom';

function ButtonComponent({ isCurrentUser, slug, onDeleteArticle, following, authorName, favorited, favoritesCount, onToggleFollow, onToggleFavorite, isLogin }) {
  let content = (<div></div>);
  if (isCurrentUser) {
    content = (
      <span>
        <NavLink to={`/editor/${slug}`} className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit" />
          &nbsp;
          Edit Article
        </NavLink>
        &nbsp;
        <button className="btn btn-outline-danger btn-sm" onClick={() => onDeleteArticle()}>
          <i className="ion-trash-a" />
          &nbsp;
          Delete Article
        </button>
      </span>
    );
  } else if (isLogin) {
    content = (
      <span>
        <button className={following ? 'btn btn-sm action-btn btn-secondary' : 'btn btn-sm action-btn btn-outline-secondary'} onClick={() => onToggleFollow()}>
          <i className="ion-plus-round" />
          &nbsp;
          {following ? `Unfollow ${authorName}` : `Follow ${authorName}`}
        </button>
        &nbsp;
        <button className={favorited ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary'} onClick={() => onToggleFavorite()}>
          <i className="ion-heart" />
          &nbsp;
          {favorited ? 'Unfavorite Article' : 'Favorite Article'}
          <span className="counter">{`(${favoritesCount})`}</span>
        </button>
      </span>
    );
  } else {
    content = (
      <span>
        <NavLink className="btn btn-sm action-btn btn-outline-secondary" to="/login">
          <i className="ion-plus-round" />
          &nbsp;
          {`Follow ${authorName}`}
        </NavLink>
        &nbsp;
        <NavLink className="btn btn-sm btn-outline-primary" to="/login">
          <i className="ion-heart" />
          &nbsp;
          Favorite Article
          <span className="counter">{`(${favoritesCount})`}</span>
        </NavLink>
      </span>
    );
  }
  return content;
}

export default ButtonComponent;
