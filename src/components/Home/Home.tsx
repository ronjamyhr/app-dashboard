import React from "react";
import { connect } from "react-redux";
import { startRemovePost } from "../../actions/posts";
import { IPost } from "../../types/Post";
import { AppState } from "../../store/configStore";
import { Dispatch, bindActionCreators } from "redux";
import { AppActions } from "../../types/actions";
import { ThunkDispatch } from "redux-thunk";
import MessageForm from "./MessageForm/MessageForm";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

interface IHomeProps {
  id?: string;
}

interface IHomePageState {}

type Props = IHomeProps & LinkStateProps & LinkDispatchProps;

export class Home extends React.Component<Props, IHomePageState> {
  onRemove = (id: string) => {
    this.props.startRemovePost(id);
  };

  render() {
    console.log("this props innehåller :", this.props);
    const { posts } = this.props;
    return (
      <div>
        <h1>Post Page</h1>
        <div>
          <MessageForm />
          <ul>
            {posts && posts.map(post => (
              <li key={post.id}>
                <p>{post.name}</p>
                <p>{post.message}</p>

                <button onClick={() => this.onRemove(post.id)}>
                  Remove post
                </button>
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

// Map our state from the store to the props in this component
const mapStateToProps = (state: AppState, ownProps: Home): LinkStateProps => ({
  posts: state.posts
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: Home
): LinkDispatchProps => ({
  startRemovePost: bindActionCreators(startRemovePost, dispatch)
});

export default compose<any>(
  connect(mapStateToProps, mapDispatchToProps)
  // firestoreConnect([
  //   { collection: 'posts' }
  // ])
)(Home);
