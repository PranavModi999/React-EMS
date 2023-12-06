/* eslint-disable react/prefer-stateless-function */
import React from "react";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="start-container">
          <h2>EMS</h2>
        </div>
        <ul>
          <li>
            <a href="/#/directory">Employee Directory</a>
          </li>
          <li>
            <a href="/#/empCreate">Employee Create</a>
          </li>
          <li>
            <a href="/#/retired">Upcoming Retirement</a>
          </li>
        </ul>
      </nav>
    );
  }
}
