import React from 'react';
import './home.scss';
import Message from './Message/Message';
import SlackMessages from './SlackMessages/SlackMessages';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Footer from './Footer/Footer';

class Home extends React.Component {
	render() {
		return (
			<div className="home-container">
				<h1>Dashboard</h1>
				<Message />
				<SlackMessages />
				<Footer />
			</div>

		);
	}
}

export default compose<any>(
	connect()(Home)
);