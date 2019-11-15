import React from 'react';
import './slackMessages.scss';
import axios from 'axios';
import Emoji from 'react-emoji-render';

interface IState {
  messages: IStateMessage[];
  users: IStateUser[];
  interval: any;
}

interface IStateUser {
  id: string;
  name: string;
}

interface IStateMessage {
  message: {
    text: string;
    user: string;
    ts: string;
  };
}

class SlackMessages extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      messages: [],
      users: [],
      interval: '',
    };

    this.getSlackMessages = this.getSlackMessages.bind(this);
    this.getSlackUsers = this.getSlackUsers.bind(this);
    this.pinnedSlackPost = this.pinnedSlackPost.bind(this);
  }

  componentDidMount() {
    this.getSlackMessages();
    this.getSlackUsers();

    // Execute the function every 30 seconds, so new messages display.
    let interval = setInterval(this.getSlackMessages, 30000);

    this.setState({
      interval: interval,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  getSlackMessages() {
    axios
      .get(
        `https://slack.com/api/pins.list?token=${process.env.REACT_APP_SLACK_TOKEN_URL}&channel=CNVGEMZPC`,
      )
      .then((result: any) => {
        this.setState({
          messages: result.data.items,
        });
      })
      .catch((error: any) => {
        //TODO: do something here?
      });
  }

  getSlackUsers() {
    axios
      .get(
        `https://slack.com/api/users.list?token=${process.env.REACT_APP_SLACK_TOKEN_URL}`,
      )
      .then((res: any) => {
        this.setState({
          users: res.data.members,
        });
      })
      .catch((error: any) => {
        //TODO: do something here?
      });
  }

  //Get the message and the user from two diffrent api and create a array with messages and usernames
  pinnedSlackPost() {
    const { messages, users } = this.state;

    const list = messages.map(singleMessage => {
      let slackMessage = singleMessage.message.text;
      let slackMessageUserId = singleMessage.message.user;
      let id = singleMessage.message.ts;
      let slackUser = users.find(item => item.id === slackMessageUserId);
      let slackUsername = slackUser ? slackUser.name : '';

      return { slackUsername, slackMessage, id };
    });

    return list;
  }

  public render() {
    const pinnedSlackMessages = this.pinnedSlackPost();

    return (
      <div className='slackmessage-container'>
        <i className='slackmessage-pin-icon fas fa-thumbtack'></i>
        <div className='slackmessage-posts-container'>
          <ul>
            {pinnedSlackMessages &&
              pinnedSlackMessages.map(post => (
                <li key={post.id}>
                  <div className='slackmessages-post-wrapper'>
                    {/* TODO: maybe use Twemoji instead of Emoji to show all emojis, but then they are ugly */}
                    <Emoji
                      className='slackmessages-post-text'
                      text={post.slackMessage}
                    />
                    <p className='slackmessages-post-user'>
                      - {post.slackUsername}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className='slackmessages-heading-container'>
          <hr className='slackmessages-heading-line' />
          <h2 className='slackmessages-heading'>PINNED NOTES FROM SLACK</h2>
        </div>
      </div>
    );
  }
}

export default SlackMessages;
