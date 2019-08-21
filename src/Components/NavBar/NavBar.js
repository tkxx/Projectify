import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Navbar, Nav } from "react-bootstrap";
import moneybagIcon from "../NavBar/moneybagIcon.svg";
import { connect } from "react-redux";
import { selectMoneybag } from "../../Redux/reducers/moneybagReducer";
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

  handleToggle = () => {
    this.setState({ toggleBag: true });
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
          <Navbar.Brand className="nav-title">🛸Projectify</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
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
              <img src={moneybagIcon} />
              <div className="coins">{this.props.coins}</div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStatetoProps(reduxState) {
  return {
    hidden: reduxState.hidden,
    coins: reduxState.moneybag
  };
}

export default connect(
  mapStatetoProps,
  { selectMoneybag }
)(NavBar);
