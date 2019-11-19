import React from 'react'
import './home.scss'
import Message from './Message/Message'
import SlackMessages from './SlackMessages/SlackMessages'
import AllPhilipsLights from './AllPhilipsLights/AllPhilipsLights'
import SonosDefaultPlayer from './SonosDefaultPlayer/SonosDefaultPlayer'

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <div className="home-left-section">
          <div className="home-message-wrapper">
            <Message />
          </div>
          <div className="home-slackmessage-wrapper">
            <SlackMessages />
          </div>
        </div>
        <div className="home-right-section">
          <div className="home-philipslight-wrapper">
            <AllPhilipsLights />
          </div>
          <div className="home-sonosplayer-wrapper">
            <SonosDefaultPlayer />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
