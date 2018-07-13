import React from 'react';
import PropTypes from 'prop-types';

function NavBar({ tag, isLogin, onClick, filter }) {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li
          className="nav-item"
          style={{ display: isLogin ? 'block' : 'none' }}
        >
          <span
            className={filter === 'personal' ? 'nav-link active' : 'nav-link'}
            onClick={() => onClick('personal', filter)}
            role="menuitem"
            tabIndex="0"
          >
            Your Feed
          </span>
        </li>
        <li className="nav-item">
          <span
            className={filter === 'global' ? 'nav-link active' : 'nav-link'}
            onClick={() => onClick('global', filter)}
            role="menuitem"
            tabIndex="0"
          >
            Global Feed
          </span>
        </li>
        <li
          className="nav-item"
          style={{ display: tag ? 'block' : 'none' }}
        >
          <span
            className={filter === 'tagged' ? 'nav-link active' : 'nav-link'}
            role="menuitem"
            tabIndex="0"
          >
            #{tag}
          </span>
        </li>
      </ul>
    </div>
  );
}

NavBar.propTypes = {
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  isLogin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  filter: PropTypes.string,
  onClick: PropTypes.func,
};

export default NavBar;
