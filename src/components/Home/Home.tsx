import React from "react";
import "./home.scss";
import Message from "./Message/Message";

interface IState{
    messages: IStateMessages[];
}


interface IStateMessages{
    id: number,
    messageContent: string
}

class Home extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    //Setup the state of our component
    this.state = {
        messages: [
            { id: 1, messageContent: 'My first message' },
            { id: 2, messageContent: 'My second message' }
        ]
    }
  }

  public render() {
    return (
      <React.Fragment>
        <h1>Home</h1>
        {
            this.state.messages.map((message) => {
                return (
                    <Message messageContent={message.messageContent} messageId={message.id} key={message.id} />
                )
            })
        }
   
      </React.Fragment>
    );
  }
}

export default Home;
