import React from 'react';
import './navbar.scss';
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'


interface IProps {
  currentlyLogged: boolean
}

interface INavbarState {
  condition: boolean
}



export class Navbar extends React.Component<IProps, INavbarState> {
  constructor(props: any) {
    super(props)
    this.state = {
      condition: true
    }
  }

  showNavbar = (e: any) => {
    e.preventDefault();
    this.setState({
      condition: !this.state.condition
    })
  }



  public render() {
    return (<>
      <div className="navbar-container">
        <div onClick={this.showNavbar} className={this.state.condition ? "hamburger" : "x"}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3 "></div>
        </div>
        {!this.state.condition ? (
          <div className="navbar">
            <div className="navbar-div">
              <p className="navbar-login-text">{!this.props.currentlyLogged ? 'login' : ''}</p>
              {window.location.pathname == "/" && <p className="navbar-login-text">home</p>}
              {window.location.pathname == "/sonosplayers" && <p className="navbar-login-text">sonos</p>}
              {window.location.pathname == "/lights" && <p className="navbar-login-text">lights</p>}
              <div className="navlink-line"></div>
            </div>
          </div>
        ) : (
            null
          )}
      </div>

    </>);
  }
}


const mapStateToProps = (state: any) => {
  return {
    currentlyLogged: state.firebase.auth.uid,
  }
}


export default compose<any>(
  connect(
    mapStateToProps,
    null
  )(Navbar)
)
