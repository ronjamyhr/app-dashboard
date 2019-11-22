import React, { useState } from 'react'
import './message.scss'
import { connect } from 'react-redux'
import { startRemovePost } from '../../../actions/posts'
import { IPost } from '../../../types/Post'
import { AppState } from './../../../index'
import { bindActionCreators } from 'redux'
import { AppActions } from '../../../types/actions'
import { ThunkDispatch } from 'redux-thunk'
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import MessageForm from '../MessageForm/MessageForm'
import Modal from 'react-responsive-modal'

type IProps = LinkStateProps & LinkDispatchProps

const Message = ({ posts, startRemovePost }: IProps) => {
  const [modalIsOpen, setOpen] = useState<boolean>(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const onRemove = (id: string) => {
    startRemovePost(id)
  }

  return (
    <div className="message-container">
      <div className="message-posts-container">
        {!isLoaded(posts) ? (
          <div className="message-loading-spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        ) : null}

        {!isEmpty(posts) ? (
          <div className="message-card-container">
            <ul>
              {posts &&
                posts.map(post => (
                  <div key={post.id}>
                    <li>
                      <div className="message-message-wrapper">
                        <p className="message-message-text">{post.message}</p>
                        <p className="message-message-name">- {post.name}</p>
                        <p className="message-message-date">
                          {moment(post.date.toDate()).format('LLLL')}
                        </p>
                      </div>
                      <div className="message-delete-wrapper">
                        <button
                          className="message-message-button"
                          onClick={() => onRemove(post.id)}
                        >
                          <i className="message-message-button-icon fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </li>
                    <hr className="message-line" />
                  </div>
                ))}
            </ul>
          </div>
        ) : (
            <div className="no-messages-card">
              <p className="message-message-no-text">No messages to show</p>
            </div>
          )}
      </div>
      <div className="message-heading-container">
        <button className="message-heading-button" onClick={() => openModal()}>
          <i className="message-heading-button-icon fas fa-plus-circle"></i>
          add post
        </button>
        <hr className="message-heading-line" />
        <h2 className="message-heading">MESSAGES</h2>
      </div>

      <Modal open={modalIsOpen} onClose={() => closeModal()} center>
        <MessageForm closePopup={() => closeModal()} />
      </Modal>
    </div>
  )
}

interface LinkStateProps {
  posts: IPost[]
}
interface LinkDispatchProps {
  startRemovePost: (id: string) => void
}

const mapStateToProps = (state: AppState, ownProps: IProps): LinkStateProps => {
  return {
    posts: state.firestore.ordered.posts,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: IProps
): LinkDispatchProps => {
  return {
    startRemovePost: bindActionCreators(startRemovePost, dispatch),
  }
}

export default compose<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'posts', orderBy: ['date', 'desc'] }])
)(Message)
