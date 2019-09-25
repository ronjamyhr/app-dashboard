import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";

class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      // Provider component surround our app and pass the
      // store into the application (so the application have access to the store)
      <BrowserRouter>
        <Navbar />
                            
        <Switch>
                                  
          <Route path="/" component={Login} exact />
                                  
          <Route path="/home" component={Home} />
                                  
          <Route component={NotFound} />
                              
        </Switch>
               
      </BrowserRouter>
    );
  }
}

export default App;
