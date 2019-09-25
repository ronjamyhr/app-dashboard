import React from "react";
import "./message.scss";
import firebase from "./../../../config/Fire";

// interface IProps {
//   messageContent: string;
//   messageId: number;
// }

interface IState {
  messages: IStateMessages[];
}

interface IStateMessages {
  id: any;
  message: string;
}

class Message extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      messages: []
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('messages');
    itemsRef.on('value', (snapshot) =>{
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          message: items[item].message

        });
      }
      this.setState({
        messages: newState
      });

    });

  }

  public render() {
    return (
      <React.Fragment>
        <h2>Meddelanden:</h2>
        <ul>
          {this.state.messages.map((message) => {
            return (
              <li key={message.id}>
              <p>meddelande: {message.message}</p>
              </li>
            )
          })}
        </ul>
        {/* <p>{this.props.messageContent}</p> */}
      </React.Fragment>
    );
  }
}

export default Message;
