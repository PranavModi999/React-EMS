import React from "react";

export default class FieldSetWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fieldStyle = {
      border: "1px solid black",
      padding: "1rem 4rem",
      margin: "2% auto",
      textAlign: "center",
      width: "50%",
    };
    return (
      <fieldset style={fieldStyle}>
        <legend>
          <h2> EMPLOYEE MANAGMENT SYSTEM</h2>
        </legend>
        {this.props.children}
      </fieldset>
    );
  }
}
