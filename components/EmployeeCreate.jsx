class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  addEmployeeHandler = (evt) => {
    evt.preventDefault();

    const formValues = {};
    new FormData(evt.target).forEach((value, key) => {
      // console.log(value, ":", key);
      formValues[key] = value.trim();
    });

    let error = "";

    if (formValues.firstName === "") error += "\n First name is required";
    if (formValues.lastName === "") error += "\n Last name is required";
    if (formValues.age > 70 || formValues.age < 20)
      error += "\n Age must be a number between 20 to 70";

    if (error.length > 0) {
      this.setState({ error: error });
    } else {
      this.props.onNewEmployeeClick(formValues);
    }
  };
  render() {
    const buttonStyle = {
      padding: "0.6rem 1rem",
      color: "fff",
      cursor: "pointer",
    };
    const labelStyle = {
      display: "inline-block",
      width: "15%",
    };
    const inputStyle = {
      width: "40%",
      padding: "4px",
      margin: "10px",
    };
    const errorStyle = {
      margin: "1rem",
      display: "block",
      color: "red",
    };
    return (
      <section>
        <h3>
          <u>
            <center>ADD EMPLOYEE</center>
          </u>
        </h3>
        <form onSubmit={this.addEmployeeHandler}>
          <div>
            <label style={labelStyle} htmlFor="firstName">
              First Name:
            </label>
            <input
              style={inputStyle}
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first Name"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="lastName">
              Last Name:
            </label>
            <input
              style={inputStyle}
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last Name"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="age">
              Age:
            </label>
            <input
              style={inputStyle}
              type="number"
              name="age"
              id="age"
              placeholder="Enter age"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="dateOfJoining">
              Date of joining:
            </label>
            <input
              style={inputStyle}
              type="date"
              name="dateOfJoining"
              id="dateOfJoining"
              placeholder="Enter date of joining"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="title">
              Title:
            </label>
            <select style={inputStyle} id="title" name="title">
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </div>
          <div>
            <label style={labelStyle} htmlFor="department">
              Department:
            </label>
            <select style={inputStyle} id="department" name="department">
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
          <div>
            <label
              style={labelStyle}
              htmlFor="employeeType"
              name="employeeTyle"
            >
              Employee Type:
            </label>
            <select style={inputStyle} name="employeeType" id="employeeType">
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
          <span style={errorStyle}>
            <pre>{this.state.error}</pre>
          </span>
          <button type="submit" style={buttonStyle}>
            Add Employee
          </button>
        </form>
      </section>
    );
  }
}
