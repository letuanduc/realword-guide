import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import TagList from './TagList';
import { changeTitle, changeDescription, changeBody, changeTaglist, changeMode, publishArticle, getSlug, resetArticle } from './actions';
import { makeGetTitle, makeGetBody, makeGetDescription, makeGetTagList } from './selectors';
import saga from './saga';
import reducer from './reducers';

export class EditorPage extends PureComponent {  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const params = this.props.location.pathname.split('/');
    const slug = params[2];
    if (!this.props.match.isExact && slug) {
      this.props.changeToUpdateMode(slug);
    } else {
      this.props.resetState();
    }
  }

  componentWillUpdate(newProps) {
    const params = newProps.location.pathname.split('/');
    const slug = params[2];
    if (!newProps.match.isExact && slug) {
      this.props.changeToUpdateMode(slug);
    } else {
      this.props.resetState();
    }
  }

  render() {
    const { title, description, body, tagList, onChangeTitle, onChangeDescription, onChangeBody, onEnterTag, onSubmit, onRemoveTag } = this.props;
    return (
      <div className="editor-page">
        <Helmet>
          <title>Editor</title>
        </Helmet>
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={onSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Article Title" value={title || ''} onChange={onChangeTitle} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control" placeholder="What's this article about?" value={description || ''} onChange={onChangeDescription} />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea className="form-control" rows="8" placeholder="Write your article (in markdown)" value={body || ''} onChange={onChangeBody} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control" placeholder="Enter tags" onKeyDown={(e) => onEnterTag(e, tagList || [])} />
                    <div className="tag-list">
                      <TagList tagList={tagList} onRemoveTag={(index) => onRemoveTag(index, tagList)} />
                    </div>
                  </fieldset>
                  <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditorPage.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  description: PropTypes.oneOfType([
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
  match: PropTypes.object,
  location: PropTypes.object,
  changeToUpdateMode: PropTypes.func,
  onChangeBody: PropTypes.func,
  onEnterTag: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onChangeDescription: PropTypes.func,
  onRemoveTag: PropTypes.func,
  resetState: PropTypes.func,
  onSubmit: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeToUpdateMode: (slug) => {
      dispatch(getSlug(slug));
      dispatch(changeMode('update'));
    },
    onChangeTitle: (e) => {
      e.preventDefault();
      dispatch(changeTitle(e.target.value));
    },
    onChangeDescription: (e) => {
      e.preventDefault();
      dispatch(changeDescription(e.target.value));
    },
    onChangeBody: (e) => dispatch(changeBody(e.target.value)),
    onEnterTag: (e, tagList) => {
      e.stopPropagation();
      e.preventDefault();
      const newTagList = JSON.parse(JSON.stringify(tagList));
      if (e.keyCode === 13 && e.target.value !== '') {
        newTagList.push(e.target.value.trim());
        dispatch(changeTaglist(newTagList));
        e.target.value = '';
      }
    },
    onRemoveTag: (index, tagList) => {
      const newTagList = JSON.parse(JSON.stringify(tagList));
      newTagList.splice(index, 1);
      dispatch(changeTaglist(newTagList));
    },
    resetState: () => dispatch(resetArticle()),
    onSubmit: (e) => {
      e.preventDefault();
      if (e.keyCode !== 13) {
        dispatch(publishArticle());
      }
    },
  };
}

const mapStateToProps = createStructuredSelector({
  title: makeGetTitle(),
  description: makeGetDescription(),
  body: makeGetBody(),
  tagList: makeGetTagList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homeEditor', reducer });
const withSaga = injectSaga({ key: 'homeEditor', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EditorPage);
