import React, { Component } from 'react';
import './messageForm.scss';
import { connect } from 'react-redux';
import { startCreatePost } from '../../../actions/posts';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types/actions';
import { bindActionCreators, compose } from 'redux';

interface IState {
  name: string;
  message: string;
  [key: string]: any;
  date: Date;
}

type IProps = LinkDispatchProps;

class MessageForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: '',
      message: '',
      date: new Date(),
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e: any) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e: any) {
    e.preventDefault();

    this.props.startCreatePost(this.state);

    this.setState({
      name: '',
      message: ''
    });
  }

  render() {
    return (
      <div className="messageform-container">
        <form className="messageform-form" onSubmit={this.onSubmit}>
        
            <label className="messageform-form-label-name"><i className="far fa-user-circle"></i> NAME</label>
            <input
              className="messageform-form-input-name"
              placeholder="enter name"
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
            />
            
            <label className="messageform-form-label-message"><i className="fas fa-pen"></i> MESSAGE</label>
            <textarea
              className="messageform-form-textarea-message"
              placeholder="enter message"
              name="message"
              onChange={this.onChange}
              value={this.state.message}
            />
 
          <button className="messageform-form-button" type="submit">SUBMIT</button>
        </form>
      </div>
    );
  }
}

interface LinkDispatchProps {
  startCreatePost: (postData: any) => void;
}

// Dispatch an action from the component.
// Map dispatch to props.
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: MessageForm): LinkDispatchProps => {
  return {
    startCreatePost: bindActionCreators(startCreatePost, dispatch)
  }
};

export default compose<any>(
  connect(null, mapDispatchToProps)(MessageForm)
);