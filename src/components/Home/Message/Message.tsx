import React from 'react';
import { connect } from 'react-redux';
import { startRemovePost } from '../../../actions/posts';
import { IPost } from '../../../types/Post';
import { AppState } from './../../../index';
import { bindActionCreators } from 'redux';
import { AppActions } from '../../../types/actions';
import { ThunkDispatch } from 'redux-thunk';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

interface IMessageProps {
  // id?: string;
}

interface IMessageState {
}

type Props = IMessageProps & LinkStateProps & LinkDispatchProps;

export class Message extends React.Component<Props, IMessageState> {

  onRemove = (id: string) => {
    this.props.startRemovePost(id);
  };

  render() {
    console.log('this.props innehåller :', this.props);

    const { posts } = this.props;
    return (
      <div className='message-container'>
        <div>
          <ul>
            {posts && posts.map(post => (
              <li key={post.id}>
                <p>{post.name}</p>
                <p>{post.message}</p>

                <button onClick={() => this.onRemove(post.id)}>Remove post</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

interface LinkStateProps {
  posts: IPost[];
}
interface LinkDispatchProps {
  startRemovePost: (id: string) => void;
}

// It connects redux state to props of react component.
// Map our state from the store to the props in this component.
const mapStateToProps = (state: AppState, ownProps: Message): LinkStateProps => {
  console.log('state: ', state);
  return {
    //posts from db firestore
    posts: state.firestore.ordered.posts
  }
}

// It connects redux actions to react props.
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: Message): LinkDispatchProps => {
  return {
    startRemovePost: bindActionCreators(startRemovePost, dispatch)
  }
};

export default compose<any>(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'posts' }
  ])
)(Message);
