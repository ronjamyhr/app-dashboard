import React from 'react';
import './errorMessage.scss';

interface IProps {
    children: string;
}

class ErrorMessage extends React.Component<IProps, {}>{

    render() {
        return (
            <p className="error-message">{this.props.children}</p>
        )
    }
}

export default ErrorMessage;
