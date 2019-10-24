import React from 'react';
import './login.scss';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { compose } from 'redux';

export class Login extends React.Component<{}, {}> {
  public render() {
    return (<>
      <LoginForm />
    </>
    );
  }
}

export default compose<any>(
  connect(null,null)(Login)
);



