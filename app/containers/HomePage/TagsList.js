import React from 'react';

function TagsList({ tagsList, tagLoading, TagError, onClick }) {
  let content = (<div></div>);

  if (tagLoading) {
    content = (
      <p>Loading tags</p>
    );
  } else if (tagsList) {
    content = (
      <div>
        {
          tagsList.map((tag) => (
            <a
              href=""
              className="tag-pill tag-default"
              onClick={(e) => {
                e.preventDefault();
                onClick(tag);
              }}
              key={`tagName-${tag}`}
            >
              {tag}
            </a>
          ))
        }
      </div>
    );
  } else {
    content = (<p>Méo có tag</p>);
  }
  if (TagError) {
    content = (<p>Cóa lỗi roài</p>);
  }
  return content;
}

export default TagsList;
