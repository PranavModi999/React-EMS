import React from "react";

export default class EmployeeSearch extends React.Component {
  render() {
    const searchStyle = {
      width: "96%",
      padding: "0.5rem 10px",
    };

    return (
      <input
        style={searchStyle}
        type="text"
        name=""
        placeholder="Enter employee to search"
        id=""
      />
    );
  }
}
