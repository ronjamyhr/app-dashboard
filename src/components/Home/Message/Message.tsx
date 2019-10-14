import React from 'react';
import './message.scss';
import { connect } from 'react-redux';
import { startRemovePost } from '../../../actions/posts';
import { IPost } from '../../../types/Post';
import { AppState } from './../../../index';
import { bindActionCreators } from 'redux';
import { AppActions } from "../../../types/actions";
import { ThunkDispatch } from 'redux-thunk';
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import MessageForm from '../MessageForm/MessageForm';
import Modal from 'react-responsive-modal';

interface IState {
    modalIsOpen: boolean;
}

type IProps = LinkStateProps & LinkDispatchProps;

export class Message extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            modalIsOpen: false
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);


    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    onRemove = (id: string) => {
        this.props.startRemovePost(id);
    };

    render() {
        const { posts } = this.props;

        return (
            <div className="message-container">

                <div className="message-posts-container">

                    {(!isLoaded(posts)) ? (

                        <div className="message-loading-spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    ) : (
                            null
                        )
                    }

                    {!isEmpty(posts) ? (
                        <div className='message-card-container'>
                            <ul>
                                {posts && posts.map(post => (
                                    <li key={post.id}>
                                        <div className="message-message-wrapper">
                                            <p className="message-message-text">{post.message}</p>
                                            <p className="message-message-name">- {post.name}</p>
                                            <p className="message-message-date">{moment(post.date.toDate()).format("LLLL")}</p>
                                        </div>
                                        {/* TODO: if statement = if user is logged in show delete button, 
                or if we want that just that user who write the post can delete it. */}
                                        <div className="message-delete-wrapper">
                                            <button className="message-message-button" onClick={() => this.onRemove(post.id)}><i className="message-message-button-icon fas fa-trash-alt"></i></button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                            <div className='no-messages-card'>
                                <p className="message-message-no-text">No messages to show</p>
                            </div>
                        )}
                </div>
                <div className="message-heading-container">
                    <button className="message-heading-button" onClick={this.openModal}><i className="message-heading-button-icon fas fa-plus-circle"></i>add post</button>
                    <hr className="message-heading-line" />
                    <h2 className="message-heading">MESSAGES</h2>
                </div>

                <Modal
                    open={this.state.modalIsOpen}
                    onClose={this.closeModal}
                    center
                >
                    <MessageForm closePopup={this.closeModal} />
                </Modal>
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
    return {
        //posts from db firestore
        posts: state.firestore.ordered.posts
    }
}

// Dispatch an action from the component.
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
