import React from 'react';
import PropTypes from 'prop-types';

function Favorite({ slug, count, favorited, onToggleFavorite }) {
  return (
    <button className={favorited ? 'btn btn-primary btn-sm pull-xs-right' : 'btn btn-outline-primary btn-sm pull-xs-right'} onClick={() => onToggleFavorite(slug, favorited)}>
      <i className="ion-heart"></i>
      {` ${count}`}
    </button>
  );
}

Favorite.propTypes = {
  count: PropTypes.number,
  favorited: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
  slug: PropTypes.string,
};

export default Favorite;
