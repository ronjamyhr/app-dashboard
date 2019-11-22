import React from 'react';
import './submitButton.scss';

interface IProps {
    disabled: boolean
    children: any

}

class SubmitButton extends React.Component<IProps, {}>{


    render() {
        return (
            <button disabled={this.props.disabled} className="submit-button" type="submit">{this.props.children}</button>
        )
    }
}

export default SubmitButton;
