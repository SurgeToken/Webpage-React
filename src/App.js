import MainPage from "./pages";
import Education from "./pages/education.jsx";
import OneSheet from "./pages/onesheet.jsx";

import React, { Component } from "react";

import { Route, Switch, HashRouter } from "react-router-dom";

class App extends Component {

  render(){
    return <HashRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/education" component={Education} />
		      <Route exact path="/onesheet" component={OneSheet} />
        </Switch>
      </HashRouter>
	}
}

export default App;
