import React from "react";
import firebase from "./../../../config/Fire";

interface IState {
  newMessageContent: string;
}

// interface IProps {
//   addMessage: any;
// }

class MessageForm extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      newMessageContent: ""
    };

    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.writeMessage = this.writeMessage.bind(this);
  }

  handleMessageInput(e: any) {
    this.setState({
      newMessageContent: e.target.value
    });
  }

  writeMessage(e: any) {
    e.preventDefault();
    const itemsRef = firebase.database().ref("messages");
    const item = {
      message: this.state.newMessageContent
    };

    itemsRef.push(item);

    // this.props.addMessage(this.state.newMessageContent);

    this.setState({
      newMessageContent: ""
    });
  }

  public render() {

    //console.log('vad är? ', this.props.addMessage);
    return (
      <React.Fragment>
        <form>
          <input
            onChange={this.handleMessageInput}
            placeholder="Skriv ett nytt meddelande..."
            value={this.state.newMessageContent}
          />
          <button onClick={this.writeMessage}>Lägg till</button>
        </form>
      </React.Fragment>
    );
  }
}

export default MessageForm;
