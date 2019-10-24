import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Login from './components/Login/Login';

interface IProps {
    currentlyLogged: boolean
}


class App extends React.Component<IProps, {}> {

    render() {
        return (
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path='/'> {this.props.currentlyLogged ? <Home /> : <Login />}</Route> 
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

//passes the data from the store to this component via props
const mapStateToProps = (state: any) => {
    return {
        currentlyLogged: state.firebase.auth.uid
    }
}


export default compose<any>(
    connect(mapStateToProps, null)(App)
);
