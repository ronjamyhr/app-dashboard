import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import NotFound from './components/NotFound/NotFound';



class App extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <BrowserRouter>
				<Navbar />
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/admin" component={Admin} />
                        <Route component={NotFound}/>
                    </Switch>
            </BrowserRouter>
        )
    }
}

export default App