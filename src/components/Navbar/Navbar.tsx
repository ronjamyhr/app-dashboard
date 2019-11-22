import React from 'react';
import './navbar.scss';
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

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
    this.setState({
      condition: !this.state.condition
    })
  }



  public render() {
    return (
      <div className="navbar-container">
        <div onClick={this.showNavbar} className={this.state.condition ? "hamburger" : "x"}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3 "></div>
        </div>
        {!this.state.condition ? (
          <div className="navbar">
            <div className="navlinks-container">
              {!this.props.currentlyLogged ?
                <p className="navbar-login-text">login</p> : (
                  <div className="navlinks"><Link onClick={this.showNavbar} to="/">home</Link><Link onClick={this.showNavbar} to="/sonosplayers">music</Link><Link onClick={this.showNavbar} to="/lights">lights</Link></div>
                )}
              <div className="navlink-line"></div>
            </div>
          </div>
        ) : (
            null
          )}
      </div>

    );
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
