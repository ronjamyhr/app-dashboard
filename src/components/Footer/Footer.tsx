import React from 'react'
import { connect } from 'react-redux'
import { AppActions } from '../../types/actions'
import { signOut } from '../../actions/authAction'
import { compose, bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import moment from 'moment'
import './footer.scss'

interface ILinkDispatchProps {
  signOutUser: any
}

interface IState {
  currentlyLogged: any
}

const Footer = ({
  signOutUser,
  currentlyLogged,
}: ILinkDispatchProps & IState) => {
  const date = moment().format('DD MMM')

  return (
    <footer>
      <div className="footer-left-section">
        <div className="navbar-footer-section">
          {!currentlyLogged && <a href="https://www.prototyp.se">prototyp</a>}
          {currentlyLogged && (
            <div onClick={signOutUser}>
              <p className="footer-signout-link">logout</p>
            </div>
          )}
          <div className="navlink-footer-line"></div>
        </div>
      </div>

      {currentlyLogged && (
        <div className="footer-right-section">
          <div className="footer-date-container">
            <div className="footer-date-container-text">
              <p className="footer-date-text">{date}</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}

const mapStateToProps = (state: any): IState => {
  return {
    currentlyLogged: state.firebase.auth.uid,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: any
): ILinkDispatchProps => {
  return {
    signOutUser: bindActionCreators(signOut, dispatch),
  }
}

export default compose<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Footer)
)
