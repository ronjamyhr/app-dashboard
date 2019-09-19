import React from "react";
import "./message.scss";

interface IProps {

  messageContent: string;
  messageId: number;

}

class Message extends React.Component<IProps, {}> {

  constructor(props: IProps){
    super(props);

    // this.messageContent = 'hej';

  }

  public render() {
    return <React.Fragment>
      <p> {this.props.messageContent}</p>

    </React.Fragment>;
  }
}

export default Message;