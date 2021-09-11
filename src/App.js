import MainPage from "./pages";
import Updates from "./pages/updates"

import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



class App extends Component {

  render(){
    return <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/updates" component={Updates} />
        </Switch>
      </Router>
  }

  
}

export default App;
