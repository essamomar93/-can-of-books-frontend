import React, { Component } from "react";
import { Navbar, Container } from "react-bootstrap";
export class Header extends Component {
  render() {
    return (
      <>
        <Navbar bg="info" variant="secondary">
          <Container>
            <Navbar.Brand href="#home">
              <h1> Library</h1>
              {/* <img
          alt="Library"
          width="50"
          height="55"

          className="d-inline-block align-top"
        />{' '} */}
            </Navbar.Brand>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;
