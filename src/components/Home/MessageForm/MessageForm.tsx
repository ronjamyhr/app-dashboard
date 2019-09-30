import React, { Component } from 'react';
import './messageForm.scss';
import { connect } from 'react-redux';
import { startCreatePost } from '../../../actions/posts';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types/actions';
import { bindActionCreators, compose } from 'redux';

//Behövs den? den används inte
interface IMessageFormProps {
  name: string;
  message: string;
  date: any;
}

interface IState {
  name: string;
  message: string;
  [key: string]: any;
  date: Date;
}

type IProps = IMessageFormProps & LinkDispatchProps;

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
      <div className="message-form-container">
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Name: </label>
            <br />
            <input
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
            />
          </div>
          <br />
          <div>
            <label>Message: </label>
            <br />
            <textarea
              name="message"
              onChange={this.onChange}
              value={this.state.message}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
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