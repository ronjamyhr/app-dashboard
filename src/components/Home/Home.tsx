import React from 'react'
import './home.scss'
import Message from './Message/Message'
import SlackMessages from './SlackMessages/SlackMessages'
import AllPhilipsLights from './AllPhilipsLights/AllPhilipsLights'
import SonosDefaultPlayer from './SonosDefaultPlayer/SonosDefaultPlayer'
// @ts-ignore
import Typical from 'react-typical'

export const Home = () => {
  return (
    <div className="home-container">
      <div className="home-left-section">
        <div className="home-message-wrapper">
          <div className="home-text-animation">
            <p className="home-text-heading">we are </p>
            <Typical
              steps={[
                '[a code lab]',
                3000,
                '[fearless generalists]',
                3000,
                '[an academy for tech wizards]',
                3000,
              ]}
              loop={Infinity}
              wrapper="sonos-wrapper"
            />
          </div>
          <Message />
        </div>
        <div className="home-slackmessage-wrapper">
          <SlackMessages />
          <div className="home-bottom-animation">
            <p className="home-text-prototyp">prototyp</p>
          </div>
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
