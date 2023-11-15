import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "whatwg-fetch";

import EmployeeDirectory from "./EmployeeDirectory.jsx";

// eslint-disable-next-line react/prefer-stateless-function
/* globals React */
/* eslint "react/jsx-no-undef": "off" */

export default class App extends React.Component {
  render() {
    return <EmployeeDirectory />;
  }
}
ReactDOM.render(<App />, document.getElementById("contents"));
