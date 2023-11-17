/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter, Redirect, Route, Switch,
} from "react-router-dom";
import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeDetail from "./EmployeeDetails.jsx";
import EmployeeDirectory from "./EmployeeDirectory.jsx";
import Navbar from "./Navbar.jsx";

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {
  render() {
    return (
      // hashrouter to allow nav bar links to work
      <HashRouter>
        <div>
          <Navbar />
          {/* by default redirects to employe list else provides paths to switch */}
          <Switch>
            <Redirect exact from="/" to="/directory" />
            <Route path="/directory" component={EmployeeDirectory} />
            <Route path="/empCreate" component={EmployeeCreate} />
            <Route path="/empEdit/:id" component={EmployeeDetail} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("contents"));
