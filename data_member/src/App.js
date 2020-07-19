import React, { useState, Component } from "react";
import bulma from "bulma";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Data_firestore from "./pages/firebase/Data_firestore";
import Data_redux from "./pages/redux/Data_redux";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/redux" component={Data_redux} />
            <Route exact path="/firestore" component={Data_firestore} />
            <Route exact path="/" component={Data_firestore} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
