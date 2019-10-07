import React from 'react';
import './home.scss';
import Message from './Message/Message';
import MessageForm from './MessageForm/MessageForm';


class Home extends React.Component {
	render(){

		return(
			<div className="home-container">
      <h1>Dashboard</h1>
        {/* TODO: messageForm = if user is logged in show, else null */}
				<MessageForm />
				<Message />			
			</div>
		)
	}
}

export default Home;