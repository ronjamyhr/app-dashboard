import React from 'react'
import './home.scss'
import Message from './Message/Message'
import SlackMessages from './SlackMessages/SlackMessages'
import Footer from './Footer/Footer'
import AllPhilipsLights from './AllPhilipsLights/AllPhilipsLights'

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h1>Dashboard</h1>
        <Message />
        <SlackMessages />
        <AllPhilipsLights />
        <Footer />
      </div>
    )
  }
}

export default Home
