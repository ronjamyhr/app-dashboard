import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCreatePost } from '../../../actions/posts';

interface IProps {
  startCreatePost: (postData: any) => void;
}

interface IState {
  name: string;
  message: string;
  [key: string]: any;
}

class PostForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: '',
      message: ''
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
      <div>
        <h2>Message Form component:</h2>
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

export default connect(null, { startCreatePost })(PostForm);