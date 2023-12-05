/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";

export default class Navbar extends React.Component {
  render() {
    return (
      <BootstrapNavbar className="shadow mb-5">
        <BootstrapNavbar.Brand className="mx-5 px-5">
          <h2>EMS</h2>
        </BootstrapNavbar.Brand>
        <Nav variant="underline" defaultActiveKey="/#/directory">
          <Nav.Item>
            <Nav.Link href="/#/directory">Employee Directory</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/#/empCreate">Employee Create</Nav.Link>
          </Nav.Item>
        </Nav>
      </BootstrapNavbar>
    );
  }
}
