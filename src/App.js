import MainPage from "./pages";
import Education from "./pages/education.jsx";

import React, { Component } from "react";

import { Route, Switch, HashRouter } from "react-router-dom";



class App extends Component {

  render(){
    return <HashRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/education" component={Education} />
        </Switch>
      </HashRouter>
  }

  
}

export default App;
