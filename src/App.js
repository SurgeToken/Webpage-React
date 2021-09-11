import MainPage from "./pages";
import Updates from "./pages"

import React, { Component } from "react";

//Import all needed Component for this tutorial
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";



class App extends Component {

  render(){
    return (

      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/updates" component={Updates} />
        </Switch>
      </Router>

      
    );
  }

  
}

export default App;
