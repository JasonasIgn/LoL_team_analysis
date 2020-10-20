import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./components/pages/Landing";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LandingPage}/>
      </Switch>
    </Router>
  );
}

export default App;
