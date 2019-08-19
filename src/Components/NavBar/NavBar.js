import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Navbar, Nav } from "react-bootstrap";
import "./NavBar.scss";

class NavBar extends Component {
  handleLogout = () => {
    axios
      .get("/auth/logout")
      .then(res => {
        this.setState({ login: false });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="navbar-body">
        <Navbar
          collapseOnSelect
          bg="dark"
          expand="lg"
          className="navbar"
          variant="dark"
        >
          <Navbar.Brand className="nav-title">Projectify</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="link-font">
                <Link to="/">Homepage</Link>
              </Nav.Link>

              <Nav.Link className="link-font">
                <Link to="/user/:id">Dashboard </Link>
              </Nav.Link>

              <Nav.Link className="link-font">
                <Link to="/donate">Donate</Link>
              </Nav.Link>

              <Nav.Link onClick={this.handleLogout} className="link-font">
                <Link to="/">Logout </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
