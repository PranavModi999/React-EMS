// eslint-disable-next-line react/prefer-stateless-function
/* globals React */
/* eslint "react/jsx-no-undef": "off" */

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

import EmployeeDetail from "./EmployeeDetails.jsx";
import EmployeeDirectory from "./EmployeeDirectory.jsx";
import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeEdit from "./EmployeeEdit.jsx";
import Navbar from "./Navbar.jsx";

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Navbar />
          <Switch>
            <Redirect exact from="/" to="/directory" />
            <Route path="/directory" component={EmployeeDirectory} />
            <Route path="/empDetail" component={EmployeeDetail} />
            <Route path="/empCreate" component={EmployeeCreate} />
            <Route path="/empEdit/:id" component={EmployeeEdit} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("contents"));
