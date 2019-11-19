import React from 'react';
import './navbar.scss';

interface INavbarState {
  condition: boolean
}

export class Navbar extends React.Component<{}, INavbarState> {
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

        <div onClick={this.showNavbar} className={this.state.condition ? "hamburger sonos" : "x"}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3 "></div>
        </div>


        {!this.state.condition ? (
          <div className="navbar">
            <div className="navbar-div">
              <p className="navbar-login-text">login</p>
              <div className="navlink-line"></div>
            </div>
            {/* <div className="navbar-footer">
              <a href="https://www.prototyp.se">prototyp</a>
              <div className="navlink-footer-line"></div>
            </div> */}
          </div>
        ) : (
            null
          )}
      </div>

    </>);
  }
}

export default Navbar;
