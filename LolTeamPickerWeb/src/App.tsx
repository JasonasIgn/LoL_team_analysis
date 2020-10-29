import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { CollectorPage } from "./components/pages/Collector";
import { LandingPage } from "./components/pages/Landing";
import { PageWrapper } from "./components/pages/PageWrapper";

function App() {
  return (
    <Router>
      <PageWrapper>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/collector" component={CollectorPage} />
        </Switch>
      </PageWrapper>
    </Router>
  );
}

export default App;
