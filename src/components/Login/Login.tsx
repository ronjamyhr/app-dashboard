import React from 'react'
import './login.scss'
import LoginForm from './LoginForm'

class Login extends React.Component<{}, {}> {
  public render() {
    return (<>
      <h1>Login page</h1>
      <LoginForm />
    </>
    );
  }
}

export default Login