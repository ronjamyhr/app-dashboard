import React from 'react'
import { connect } from 'react-redux'
import { authLogin } from '../../actions/authAction'
import { AppActions } from '../../types/actions'
import { bindActionCreators, compose } from 'redux'
import { IUser } from '../../types/authInterface'
import { ThunkDispatch } from 'redux-thunk'
import SubmitButton from '../SubmitButton/SubmitButton'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

type IProps = ILinkStateProps & ILinkDispatchProps

interface ILoginFormState {
  email: string
  password: string
  errorMsgEmail: string
  errorMsgPassword: string
  validEmail: boolean
  validPassword: boolean
  validatedForm: boolean
  hasErrors: {
    password: boolean
    email: boolean
  }
}

interface ILinkStateProps {
  currentlyLogged: any
}

interface ILinkDispatchProps {
  authLogin: (user: IUser) => void
}

export class LoginForm extends React.Component<IProps, ILoginFormState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMsgEmail: '',
      errorMsgPassword: '',
      validEmail: false,
      validPassword: false,
      validatedForm: false,
      hasErrors: {
        password: false,
        email: false,
      },
    }
  }

  handleEmailChange = (e: any) => {
    const { id, value } = e.target
    const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    //validEmail(boolean) is true when it matches condition of regEx
    const validEmail = regexEmail.test(value)
    let errorMsgForMail = this.state.errorMsgEmail
    let errors: any = this.state.hasErrors
    //this condition will always run as soon as user starts typing inside email-input
    if (id === 'email') {
      errors.email = false
      errorMsgForMail = ''

      if (!validEmail) {
        errors.email = true
        errorMsgForMail = 'please enter a valid email address'
      }
    }

    this.setState({
      email: e.target.value,
      errorMsgEmail: errorMsgForMail,
      hasErrors: errors,
    })

    this.validate()
  }

  handlePasswordChange = (e: any) => {
    //Password expression. Password must be between 6 and 100 digits long and include at least one numeric digit.
    const regExPassword = /^(?=.*\d).{6,100}$/
    const { id, value } = e.target
    const validPassword = regExPassword.test(value)
    let errorMsgForPassword = this.state.errorMsgPassword
    let errors: any = this.state.hasErrors

    if (id === 'password') {
      errors.password = false
      errorMsgForPassword = ''

      if (!validPassword) {
        errors.password = true
        errorMsgForPassword =
          'password must be between 6 and 100 digits long and include at least one numeric digit.'
      }
    }

    this.setState({
      password: e.target.value,
      errorMsgPassword: errorMsgForPassword,
      hasErrors: errors,
    })

    this.validate()
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    this.props.authLogin(this.state)
  }

  validate() {
    let validForm = false

    //when user types correct data from both input fields, the state of validatedForm updates to true and login-button will be visible
    if (!this.state.hasErrors.email && !this.state.hasErrors.password) {
      validForm = true
    }

    if (this.state.password === '' || this.state.email === '') {
      validForm = false
    }

    this.setState({
      validatedForm: validForm,
    })
  }

  public render() {
    return (
      <div className="loginform-container">
        <div className="loginform-img"></div>
        <div className="loginform-right-section">
          <div className="login-top">
            <form className="loginform" onSubmit={this.handleSubmit}>
              <label>
                <i className="far fa-user-circle"></i>EMAIL
              </label>
              <input
                type="text"
                name="username"
                id="email"
                onChange={this.handleEmailChange}
                placeholder="name@prototyp.se"
                required
              />
              {this.state.errorMsgEmail.length > 0 ? (
                <ErrorMessage>{this.state.errorMsgEmail}</ErrorMessage>
              ) : null}
              <label>
                <i className="fas fa-lock"></i>PASSWORD
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={this.handlePasswordChange}
                placeholder="••••••"
              />
              {this.state.errorMsgPassword.length > 0 ? (
                <ErrorMessage>{this.state.errorMsgPassword}</ErrorMessage>
              ) : null}

              <SubmitButton disabled={!this.state.validatedForm}>
                LOGIN<i className="far fa-arrow-alt-circle-right"></i>
              </SubmitButton>
            </form>
          </div>
          <div className="login-bottom">
            <div className="login-box">
              <h1 className="login-title">login.</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: LoginForm
): ILinkDispatchProps => {
  return {
    //dispatches the actioncreator authLogin
    authLogin: bindActionCreators(authLogin, dispatch),
  }
}

export default compose<any>(
  connect(
    null,
    mapDispatchToProps
  )(LoginForm)
)
