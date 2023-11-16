import React from "react";

import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeTable from "./EmployeeTable.jsx";

import GraphQlQueries from "../server/graphQlQueries.js";
import FieldSetWrapper from "./FieldSetWrapper.jsx";

export default class EmployeeDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      employeeFilter: "",
    };
  }
  async componentDidMount() {
    const data = await GraphQlQueries.fetchEmployeesByFilter(
      this.state.employeeFilter
    );
    console.log("data", data);
    this.setState({ employees: data });
  }

  render() {
    return (
      <FieldSetWrapper>
        <EmployeeSearch
          onFilterChange={async (filter) => {
            this.setState({
              employees: await GraphQlQueries.fetchEmployeesByFilter(filter),
            });
          }}
        />
        <EmployeeTable employees={this.state.employees} />
      </FieldSetWrapper>
    );
  }
}
