import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Modal, ModalDialog } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import axios from "axios";
import loginimg from "./loginimg.svg";
import "./login.scss";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      closeModal: false
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClose = () => {
    this.setState({ closeModal: true });
    console.log(this.state);
  };

  login = e => {
    e.preventDefault();
    let { username, password } = this.state;
    axios
      .post("/auth/login", { username, password })
      .then(res => {
        this.setState({ login: true });
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        {this.state.login && <Redirect to="/user" />}
        <div className="login-page">
          <Modal.Dialog
            centered
            animation
            aria-labelledby="contained-modal-title-vcenter"
          >
            <Modal.Header closeButton onHide={() => this.handleClose()}>
              <Modal.Title id="contained-modal-title-vcenter">
                <img src={loginimg} alt="ufo crash landing img" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.login} onClick={() => this.handleClose()}>
                <h3 className="login-form">Username</h3>{" "}
                <input
                  name="username"
                  type="text"
                  className="text-box"
                  onChange={this.handleChange}
                />
                <h3 className="login-form">Password</h3>{" "}
                <input
                  name="password"
                  // type="password"
                  type="text"
                  className="text-box"
                  onChange={this.handleChange}
                />
                <p>
                  <button className="btn">Login</button>
                </p>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Link to="/register">
                <p className="sign-up-link">
                  Don't have an account? <strong>Sign up.</strong>
                </p>
              </Link>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>
    );
  }
}

export default Login;
