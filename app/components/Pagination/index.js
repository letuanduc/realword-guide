import React from 'react';
// import PropTypes from 'prop-types';

function Pagination({ articlesCount, onClick, currentOffset, limit }) {
  let content = null;
  if (articlesCount > limit) {
    const total = Math.ceil(articlesCount / limit);
    const pages = [];
    for (let i = 1; i <= total; i += 1) {
      pages.push(i);
    }
    content = (
      <nav>
        <ul className="pagination">
          {
            pages.map((page) => {
              const offset = (page - 1) * limit;
              return (
                <li key={`page-${page}`} className={offset === currentOffset ? 'page-item active' : 'page-item'}>
                  <a
                    href=""
                    className="page-link"
                    key={`Page-no-${page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onClick(offset, currentOffset);
                    }}
                  >
                    {page}
                  </a>
                </li>
              );
            })
          }
        </ul>
      </nav>
    );
  }
  return content;
}

export default Pagination;
