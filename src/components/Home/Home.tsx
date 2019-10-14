import React from 'react';
import './home.scss';
import Message from './Message/Message';
import MessageForm from './MessageForm/MessageForm';
import { AppActions } from "../../types/actions";
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { signOut } from '../../actions/authAction';
import { ThunkDispatch } from 'redux-thunk';
import Footer from './Footer/Footer';


class Home extends React.Component {


	render(){

		return(
			<div className="home-container">
      <h1>Dashboard</h1>
        {/* TODO: messageForm = if user is logged in show, else null */}
				<MessageForm />
				<Message />	
				<Footer />
				{/* <button type="button" onClick={s
					ignOut}>Sign out</button>		 */}
			</div>
		)
	}
}

// const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: Home) => {
//     return {
//         signOut: bindActionCreators(signOut, dispatch)
//     }
// };

export default compose<any>(
    connect()(Home)
);