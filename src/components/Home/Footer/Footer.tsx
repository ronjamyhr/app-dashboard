import React from "react";
import { connect } from 'react-redux';
import { AppActions } from '../../../types/actions';
import { signOut } from '../../../actions/authAction';
import { compose, bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';


interface ILinkDispatchProps {
    signOutUser: any
}


class Footer extends React.Component<ILinkDispatchProps, {}> {
    public render() {

        return <>
            <ul className="footer-signout-link">
                {/* when user clicks on the link, it fires the signOutUser function, which dispatches the actioncreator signOut*/}
                <li><a onClick={this.props.signOutUser}>logout</a></li>
            </ul>

        </>;
    }
}

//mapDispatchToProps so that we can create this action signOut
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: Footer): ILinkDispatchProps => {

    return {
        //signOutUser is my props-object
        signOutUser: bindActionCreators(signOut, dispatch)
    }
}

export default compose<any>(
    connect(null, mapDispatchToProps)(Footer)
);