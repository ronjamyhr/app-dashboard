import React from 'react'
import Message from './Message/Message'
import MessageForm from './MessageForm/MessageForm'
import './home.scss';

class Home extends React.Component {
	render(){

		return(
			<div className="home-container">
      <h1>Dashboard</h1>
				<MessageForm />
				<Message />			
			</div>
		)
	}
}

export default Home;