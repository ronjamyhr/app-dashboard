import React from 'react';
import './message.scss';
import { connect } from 'react-redux';
import { startRemovePost } from '../../../actions/posts';
import { IPost } from '../../../types/Post';
import { AppState } from './../../../index';
import { bindActionCreators } from 'redux';
import { AppActions } from '../../../types/actions';
import { ThunkDispatch } from 'redux-thunk';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';

//Behövs den? den används inte
interface IMessageProps {
    id: string;
    name: string;
    message: string;
}

type IProps = IMessageProps & LinkStateProps & LinkDispatchProps;

export class Message extends React.Component<IProps, {}> {

    onRemove = (id: string) => {
        this.props.startRemovePost(id);
    };

    render() {
        // console.log('this.props innehåller :', this.props);
        const { posts } = this.props;
        const postList = !isEmpty(posts) ? (
            <div className='message-card'>
                <ul>
                    {posts && posts.map(post => (
                        <li key={post.id}>
                            <p className="message-message-text">{post.message}</p>
                            <p className="message-message-name">- {post.name}</p>
                            <p className="message-message-date">{moment(post.date.toDate()).format("LLLL")}</p>
                            {/* if statement = if user is logged in show delete button, 
                or if we want that just that user who write the post can delete it. */}
                            <button className="message-message-button" onClick={() => this.onRemove(post.id)}><i className="message-message-button-icon fas fa-trash-alt"></i></button>
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <div className='no-messages-card'>
                <p className="message-message-no-text">No messages to show</p>
            </div>
            );

        return (
            <div className='message-container'>
                {postList}
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

// Dispatch an action from the component.
// Map dispatch to props.
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: Message): LinkDispatchProps => {
    return {
        startRemovePost: bindActionCreators(startRemovePost, dispatch)
    }
};

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'posts', orderBy: ['date', 'desc'] }
    ])
)(Message);
