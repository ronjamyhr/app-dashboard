import React, { Component } from 'react';
import './messageForm.scss';
import { connect } from 'react-redux';
import { startCreatePost } from '../../../actions/posts';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types/actions';
import { bindActionCreators, compose } from 'redux';

interface IState {
    name: string;
    message: string;
    date: Date;
    nameInputError: string;
    messageInputError: string;
    isValid: boolean;
    hasErrors: {
        name: boolean,
        message: boolean
    }
}

type IProps = LinkDispatchProps;

class MessageForm extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            name: '',
            message: '',
            date: new Date(),
            nameInputError: '',
            messageInputError: '',
            isValid: false,
            hasErrors: {
                name: false,
                message: false
            }
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.validate = this.validate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isNullOrEmpty = this.isNullOrEmpty.bind(this);
    }

    isNullOrEmpty(string: any) {
        return !string || !string.trim();
    }

    onChangeName(e: any) {
        e.preventDefault();

        const { name, value } = e.target;
        const regex = /^[a-zA-Z0-9åäöÅÄÖ ]+$/;
        const isValid = regex.test(value);

        let nameInput = this.state.nameInputError;
        let errors: any = this.state.hasErrors;

        if (name === 'name') {
            errors.name = false;
            nameInput = '';

            if (this.isNullOrEmpty(value)) {
                nameInput = 'name is empty or contains only spaces';
                errors.name = true;
            }
            if (!isValid) {
                nameInput = 'name must only contain letters and whitespaces';
                errors.name = true;
            }
        }

        this.setState({
            name: e.target.value,
            nameInputError: nameInput,
            hasErrors: errors
        });

        this.validate();
    }

    onChangeMessage(e: any) {
        e.preventDefault();

        const { name, value } = e.target;

        let messageInput = this.state.messageInputError;
        let errors: any = this.state.hasErrors;

        if (name === 'message') {
            errors.name = false;
            messageInput = '';

            if (this.isNullOrEmpty(value)) {
                messageInput = 'message is empty or contains only spaces';
                errors.name = true;
            }
        }

        this.setState({
            message: e.target.value,
            messageInputError: messageInput,
            hasErrors: errors
        });

        this.validate();
    }

    validate() {

        let validForm = false;
        //check for input errors
        if (!this.state.hasErrors.name && !this.state.hasErrors.message) {
            validForm = true;
        }
        //check if any input field is empty
        if (this.state.name === '' || this.state.message === '') {
            validForm = false;
        }

        this.setState({
            isValid: validForm
        });
    }

    onSubmit(e: any) {
        e.preventDefault();

        this.props.startCreatePost(this.state);

        this.setState({
            name: '',
            message: ''
        });
    }

    render() {
        return (
            <div className="messageform-container">
                <form className="messageform-form" onSubmit={this.onSubmit}>

                    <label className="messageform-form-label-name"><i className="far fa-user-circle"></i> NAME</label>
                    <input
                        className="messageform-form-input-name"
                        placeholder="enter name"
                        type="text"
                        name="name"
                        onChange={this.onChangeName}
                        value={this.state.name}
                    />
                    {this.state.nameInputError.length > 0 ? (
                        <p className="messageform-form-error-message">{this.state.nameInputError}</p>
                    ) : (
                            null
                        )}

                    <label className="messageform-form-label-message"><i className="fas fa-pen"></i> MESSAGE</label>
                    <textarea
                        className="messageform-form-textarea-message"
                        placeholder="enter message"
                        name="message"
                        onChange={this.onChangeMessage}
                        value={this.state.message}
                    />
                    {this.state.messageInputError.length > 0 ? (
                        <p className="messageform-form-error-message">{this.state.messageInputError}</p>
                    ) : (
                            null
                        )}

                    <button disabled={!this.state.isValid} className="messageform-form-button" type="submit">SUBMIT</button>
                </form>
            </div>
        );
    }
}

interface LinkDispatchProps {
    startCreatePost: (postData: any) => void;
}

// Dispatch an action from the component.
// Map dispatch to props.
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: MessageForm): LinkDispatchProps => {
    return {
        startCreatePost: bindActionCreators(startCreatePost, dispatch)
    }
};

export default compose<any>(
    connect(null, mapDispatchToProps)(MessageForm)
);