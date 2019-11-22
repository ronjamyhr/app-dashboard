import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { Home } from './components/Home/Home'
import { NotFound } from './components/NotFound/NotFound'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Login from './components/Login/Login'
import PhilipsLights from './components/PhilipsLights/PhilipsLights'
import Sonos from './components/Sonos/Sonos'
import Footer from './components/Footer/Footer'
import './app.scss'

interface IProps {
  currentlyLogged: boolean
}

class App extends React.Component<IProps, {}> {
  public render() {
    console.log("hello", this.props.currentlyLogged)
    return (

      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            {this.props.currentlyLogged ? <Home /> : <Login />}
          </Route>
          <Route exact path="/lights">
            {this.props.currentlyLogged ? <PhilipsLights /> : <Login />}
          </Route>
          <Route exact path="/sonosplayers">
            {this.props.currentlyLogged ? <Sonos /> : <Login />}
          </Route>
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </BrowserRouter>
    )
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
  )(App)
)
