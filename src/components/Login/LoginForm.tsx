import React from 'react';
import { connect } from 'react-redux';
import { authLogin } from '../../actions/authAction';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from "../../types/actions";
import { compose, bindActionCreators } from 'redux';
import { IUser } from '../../types/authInterface';

interface ILoginFormState {
    email: string
    password: string
}

interface ILinkDispatchProps {
    authLogin: (user: IUser) => void;
}

class LoginForm extends React.Component<ILoginFormState & ILinkDispatchProps> {
    constructor(props: any) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    //id for the target element, grabs the correct state element and updates it. the id matches the state-property-names.
    handleInput = (e: any) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        // @ts-ignore
        this.props.authLogin(this.state);
    }

    public render() {
        return (<>
            <form onSubmit={this.handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" id="email" onChange={this.handleInput} />
                <label>Password</label>
                <input type="password" name="password" id="password" onChange={this.handleInput} />
                <button type="submit">Login</button>
            </form>
        </>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: LoginForm): ILinkDispatchProps => {
    return {
        //dispatches the actioncreater authLogin  
        authLogin: bindActionCreators(authLogin, dispatch)
    }
};

export default compose<any>(
    connect(null, mapDispatchToProps)(LoginForm)
);



