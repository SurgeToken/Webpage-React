import MainPage from "./pages";
import Updates from "./pages/updates"

import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";



class App extends Component {

  render(){
    return <HashRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/updates" component={Updates} />
        </Switch>
      </HashRouter>
  }

  
}

export default App;
