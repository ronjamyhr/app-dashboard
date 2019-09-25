import React from "react";
import "./home.scss";
import Message from "./Message/Message";
import MessageForm from "./MessageForm/MessageForm";
// import { firebaseConfig } from "./../../config/Fire";
// import firebase from "firebase/app";

interface IState {
  messages: IStateMessages[];
//   app: firebase.app.App;
}

interface IStateMessages {
  id: number;
  messageContent: string;
}

class Home extends React.Component<{}, IState> {
    
  constructor(props: any) {
    super(props);

    // this.app : firebase.app.App = firebase.initializeApp(firebaseConfig);
    // this.database = this.app.database().ref().child(messages);

    this.state = {
      messages: [],
    //   app: firebase.initializeApp(firebaseConfig),
      //referera till child location in the database, där vi har en lista
      // som heter messages där vi sparar vår meddelanden:
      //db: this.state.app.database().ref().child('messages')
    }

    // this.addMessage = this.addMessage.bind(this);
  }

//   addMessage(message: any) {
//     const previousMessage = this.state.messages;
//     previousMessage.push({
//       id: previousMessage.length + 1,
//       messageContent: message
//     });

//     this.setState({
//       messages: previousMessage
//     });

//     console.log('previous message: ', previousMessage);
//   }

  public render() {
    return (
      <React.Fragment>
        <h1>Home</h1>
        {/* {this.state.messages.map(message => {
          return (
            <Message
            //   messageContent={message.messageContent}
            //   messageId={message.id}
              key={message.id}
            />
          );
        })} */}
        <Message />
        <MessageForm />
      </React.Fragment>
    );
  }
}

export default Home;
