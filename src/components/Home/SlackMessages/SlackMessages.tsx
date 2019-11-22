import React from 'react'
import './slackMessages.scss'
import axios from 'axios'
import Emoji from 'react-emoji-render'

interface IState {
  messages: IStateMessage[]
  users: IStateUser[]
  interval: any
}

interface IStateUser {
  id: string
  name: string
}

interface IStateMessage {
  message: {
    text: string
    user: string
    ts: string
  }
}

class SlackMessages extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)

    this.state = {
      messages: [],
      users: [],
      interval: '',
    }
  }

  componentDidMount() {
    this.getSlackMessages()
    this.getSlackUsers()

    // Execute the function every 30 seconds, so new messages display.
    const interval = setInterval(this.getSlackMessages, 30000)

    this.setState({
      interval: interval,
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  // The current channel is the sth-office
  getSlackMessages = () => {
    axios
      .get(
        `https://slack.com/api/pins.list?token=${process.env.REACT_APP_SLACK_TOKEN_URL}&channel=C07B6BWM8`
      )
      .then((result: any) => {
        this.setState({
          messages: result.data.items,
        })
      })
      .catch((error: any) => {
      })
  }

  getSlackUsers = () => {
    axios
      .get(
        `https://slack.com/api/users.list?token=${process.env.REACT_APP_SLACK_TOKEN_URL}`
      )
      .then((res: any) => {
        this.setState({
          users: res.data.members,
        })
      })
      .catch((error: any) => {
      })
  }

  //Get the message and the user from two diffrent api and create a array with messages and usernames
  pinnedSlackPost = () => {
    const { messages, users } = this.state

    const list = messages.map(singleMessage => {
      const slackMessage = singleMessage.message.text
      const slackMessageUserId = singleMessage.message.user
      const id = singleMessage.message.ts
      const slackUser = users.find(item => item.id === slackMessageUserId)
      const slackUsername = slackUser ? slackUser.name : ''

      return { slackUsername, slackMessage, id }
    })

    return list
  }

  public render() {
    const pinnedSlackMessages = this.pinnedSlackPost()

    return (
      <div className="slackmessage-container">
        <div className="slackmessage-posts-container">
          {pinnedSlackMessages.length >= 1 ? (
            <div className="slackmessage-card-container">
              <ul>
                {pinnedSlackMessages &&
                  pinnedSlackMessages.map(post => (
                    <div key={post.id}>
                      <li>
                        <div className="slackmessages-post-wrapper">
                          <Emoji
                            className="slackmessages-post-text"
                            text={post.slackMessage.replace(/[<>]/g, '')}
                          />
                          <p className="slackmessages-post-user">
                            - {post.slackUsername}
                          </p>
                        </div>
                      </li>
                      <hr className="slackmessage-line" />
                    </div>
                  ))}
              </ul>
            </div>
          ) : (
              <div className="no-messages-card">
                <p className="slackmessages-no-text">
                  No pinned messages to show
              </p>
              </div>
            )}
        </div>

        <div className="slackmessages-heading-container">
          <hr className="slackmessages-heading-line" />
          <h2 className="slackmessages-heading">PINNED NOTES FROM SLACK</h2>
        </div>
      </div>
    )
  }
}

export default SlackMessages
