import React from "react";
import GraphQLQueries from "../server/graphQlQueries";

class EmployeeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const data = await GraphQLQueries.getEmployeeById(id);
      console.log("employee fetch:", data);
      this.setState({ data });
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { data } = this.state;

    if (!data) {
      return <div>Loading...</div>;
    }

    return <h2>{`This is a placeholder for editing employee ${id}`}</h2>;
  }
}

export default EmployeeEdit;
