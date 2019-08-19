import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import registerimg from "../Register/registerimg.svg";
import { Navbar, Nav, Button, Container, Col, Row } from "react-bootstrap";
import "./Register.scss";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      login: false
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  register = e => {
    e.preventDefault();
    let { firstName, lastName, email, username, password } = this.state;
    axios
      .post("/auth/register", {
        firstName,
        lastName,
        email,
        username,
        password
      })
      .then(res => {
        this.setState({ login: true });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="register-body">
        <div className="wallpaper-register">
          <Navbar bg="dark" expand="lg" className="navbar" variant="dark">
            <Navbar.Brand className="nav-title">Projectify</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav right>
                  <Nav.Link className="link-font">
                    <Link to="/">Homepage</Link>
                  </Nav.Link>

                  <Nav.Link className="link-font">
                    <Link to="/donate">Donate</Link>
                  </Nav.Link>
                </Nav>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {this.state.login && <Redirect to="/user" />}
          <div className="register-img">
            {/* <img src={registerimg} alt="register img" /> */}
          </div>
          <Container>
            <Row>
              <Col>
                <div className="register-left-side">
                  <img src={registerimg} alt-text="green-ufo" />
                  <p>
                    <span className="register-description">
                      Fuel is low... <p />
                      Carburetor is malfunctioning... <p />
                      Earth landing is imminent...
                    </span>
                  </p>
                </div>
              </Col>
              <Col>
                <div className="register-portion">
                  <h2 className="register-title">WHO ARE YOU?</h2>
                  <p>
                    <form onSubmit={this.register}>
                      <ul className="register-form">
                        <h3>First Name</h3>{" "}
                        <input
                          type="text"
                          name="firstName"
                          onChange={this.handleChange}
                        />
                        <h3>Last Name</h3>{" "}
                        <input
                          type="text"
                          name="lastName"
                          onChange={this.handleChange}
                        />
                        <h3>Email</h3>{" "}
                        <input
                          type="text"
                          name="email"
                          onChange={this.handleChange}
                        />
                        <h3>Username</h3>{" "}
                        <input
                          type="text"
                          name="username"
                          onChange={this.handleChange}
                        />
                        <h3>Password</h3>{" "}
                        <input
                          type="password"
                          name="password"
                          onChange={this.handleChange}
                        />
                        <p>
                          <Button variant="light" className="btn">
                            Register
                          </Button>
                        </p>
                      </ul>
                    </form>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Register;
