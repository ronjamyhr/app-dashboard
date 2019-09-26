import React from 'react'
import Message from './Message/Message'
import MessageForm from './MessageForm/MessageForm'

class Home extends React.Component {
	render(){
		return(
			<div className="container">
      <h1>Post page</h1>
				<MessageForm />
				<Message />			
			</div>
		)
	}
}

export default Home;