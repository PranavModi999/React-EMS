class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const headerList = ["FirstName", "LastName", "Age", "DateOfJoining", "Title", "Department", "EmployeeType", "CurrentStatus"];
    const tableStyle = {
      width: "100%",
      borderCollapse: "collapse"
    };
    const cellStyle = {
      border: "1px solid black",
      padding: "8px"
    };
    return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("table", {
      style: tableStyle
    }, /*#__PURE__*/React.createElement("caption", null, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("u", null, "EMPLOYEE LIST"))), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, headerList.map((header, index) => /*#__PURE__*/React.createElement("th", {
      key: index,
      style: cellStyle
    }, header)))), /*#__PURE__*/React.createElement("tbody", null, this.props.employees.map((emp, index) => /*#__PURE__*/React.createElement("tr", {
      key: index
    }, /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.FirstName), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.LastName), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.Age), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.DateOfJoining.toDateString()), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.Title), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.Department), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.EmployeeType), /*#__PURE__*/React.createElement("td", {
      style: cellStyle
    }, emp.CurrentStatus))))));
  }
}