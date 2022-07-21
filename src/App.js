import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import SigninScreen from "./screens/signin";
import RouteHome from './RouteHome'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SigninScreen} />
        <RouteHome />
      </Switch>
    </Router>
  );
}

export default App;
