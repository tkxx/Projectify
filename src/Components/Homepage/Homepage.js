import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Login from "../Login/Login";
import "./Homepage.scss";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  handleModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    let { showModal } = this.state;
    return (
      <div className="body-homepage">
        <div className="wallpaper-homepage">
          <Navbar bg="dark" expand="lg" variant="light" className="navbar">
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

          <span className="title">
            <h1 className="title-name">Projectify</h1>
          </span>
          <p className="subheading">Earn points finishing projects.</p>

          <div className="buttons">
            <Link to="/register">
              <Button variant="light" bsStyle="btn">
                Register
              </Button>
            </Link>
            <Button variant="light" bsStyle="btn" onClick={this.handleModal}>
              Login
            </Button>
            {showModal && <Login />}
          </div>

          {/* <div>
              Icons made by{" "}
              <a
                href="https://www.flaticon.com/authors/nhor-phai"
                title="Nhor Phai"
              >
                Nhor Phai
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>{" "}
              is licensed by{" "}
              <a
                href="http://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
              >
                CC 3.0 BY
              </a>
            </div> */}
        </div>
      </div>
    );
  }
}

export default Homepage;
