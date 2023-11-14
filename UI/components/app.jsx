import EmployeeDirectory from "./EmployeeDirectory.jsx";

/* eslint "react/react-in-jsx-scope": "off" */
/* eslint-disable arrow-body-style */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */

// eslint-disable-next-line react/prefer-stateless-function
/* globals React */
/* eslint "react/jsx-no-undef": "off" */

export default class App extends React.Component {
  render() {
    return <EmployeeDirectory />;
  }
}
ReactDOM.render(<App />, document.getElementById("contents"));
