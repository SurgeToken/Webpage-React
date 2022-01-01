import MainPage from "./pages";
import Education from "./pages/education.jsx";
import OneSheet from "./pages/onesheet.jsx";
import RoadMap from "./pages/roadmap.jsx";
import Updates from "./pages/updates.jsx";
import Disclosures from "./pages/disclosures.jsx";
import SurgeFund from "./pages/surgefund.jsx";

import React, { Component } from "react";

import { Route, Switch, HashRouter } from "react-router-dom";

class App extends Component {

  render(){
    return <HashRouter>
        <Switch>
          	<Route path="/" component={MainPage} />
          	<Route exact path="/education" component={Education} />
			<Route exact path="/surgefund" component={SurgeFund} />
		    <Route exact path="/onesheet" component={OneSheet} />
			<Route exact path="/roadmap" component={RoadMap} />
			<Route exact path="/updates" component={Updates} />
			<Route exact path="/disclosures" component={Disclosures} />
        </Switch>
      </HashRouter>
	}
}

export default App;
