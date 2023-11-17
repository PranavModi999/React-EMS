/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */

import React from "react";

import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeTable from "./EmployeeTable.jsx";

import GraphQlQueries from "../server/graphQlQueries.js";

export default class EmployeeDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      employeeFilter: "",
    };
    // bind functions
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.updateEmployeeList = this.updateEmployeeList.bind(this);
  }

  async componentDidMount() {
    // fetch employees on component mount
    this.updateEmployeeList();
  }

  // delete employee in database with matching id
  async onDeleteClick(id) {
    try {
      await GraphQlQueries.deleteEmployeeById(id);
      this.updateEmployeeList();
      alert("Employee deleted successfully!");
    } catch (error) {
      throw error;
    }
  }

  // fetch employee based on new filter and update state
  async onFilterChange(filter) {
    this.setState({
      employees: await GraphQlQueries.fetchEmployeesByFilter(filter),
    });
  }

  async updateEmployeeList() {
    const data = await GraphQlQueries.fetchEmployeesByFilter(
      this.state.employeeFilter,
    );
    this.setState({ employees: data });
  }

  render() {
    return (
      <React.Fragment>
        <EmployeeSearch
          onFilterChange={filter => this.onFilterChange(filter)}
        />
        <EmployeeTable
          employees={this.state.employees}
          onDeleteClick={id => this.onDeleteClick(id)}
        />
      </React.Fragment>
    );
  }
}
