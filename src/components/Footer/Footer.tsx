import React from "react";
import { connect } from 'react-redux';
import { AppActions } from '../../types/actions';
import { signOut } from '../../actions/authAction';
import { compose, bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import moment from 'moment';
import './footer.scss';


interface ILinkDispatchProps {
    signOutUser: any
}


const Footer = ({ signOutUser }: ILinkDispatchProps) => {
const date = moment().format('DD MMM');

    return (
        <footer>
            <div className="navbar-footer">
                <a href="https://www.prototyp.se">prototyp</a>
                <div className="navlink-footer-line"></div>
            </div>
            <ul className="footer-signout-link">
                {/* when user clicks on the link, it fires the signOutUser function, which dispatches the actioncreator signOut*/}
                <li><div onClick={signOutUser}>logout</div></li>
            </ul>
            <div className="footer-date-container"><div className="footer-date-container-text"><p className="footer-date-text">{date}</p></div></div>
        </footer>
    );
}



//mapDispatchToProps so that we can create this action signOut
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: any): ILinkDispatchProps => {

    return {
        //signOutUser is my props-object
        signOutUser: bindActionCreators(signOut, dispatch)
    }
}

export default compose<any>(
    connect(null,
        mapDispatchToProps)(Footer)
);

