import React from 'react';

function TagList({ tagList, onRemoveTag }) {
  let content = (<div></div>);
  let id = -1;
  if (tagList) {
    content = (
      <div>
        {
          tagList.map((tag, index) => {
            id += 1;
            return (
              <span className="tag-default tag-pill" key={`tag-${tag}-${id}`}>
                <i className="ion-close-round" onClick={() => onRemoveTag(index)} role="button" tabIndex="0" />
                {tag}
              </span>
            );
          })
        }
      </div>);
  }
  return content;
}

export default TagList;
