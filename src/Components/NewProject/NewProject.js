import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ModalDialog, Modal } from "react-bootstrap";
import "./NewProject.scss";

class NewProject extends Component {
  constructor(props) {
    super(props);

    //NEED HELP HERE TO GET SESSION & PUT TO REDUX
    this.state = {
      user_id: +0,
      title: "",
      description: "",
      isComplete: false,
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

  componentDidMount = () => {
    this.getUserSession();
  };

  addProject = e => {
    let { user_id, title, isComplete, description } = this.state;
    axios
      .post("/api/projects", { user_id, title, isComplete, description })
      .then(res => {
        console.log(res);
        this.props.getProjects();
        this.props.handleClose();
      })
      .catch(err => console.log(err));
  };

  getUserSession = () => {
    axios.get("/auth/session").then(res =>
      this.setState({
        user_id: res.data.id
      })
    );
  };

  render() {
    return (
      <Modal className="new-project-page" centered autoFocus {...this.props}>
        {this.state.closeModal && <Redirect to="/user" />}
        {/* <Modal.Header closeButton onHide={() => this.handleModal()}> */}
        <Modal.Header closeButton onHide={() => this.handleClose()}>
          {" "}
          {/* <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="project-title">{this.state.title}</h3>
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <h2>{this.state.title}</h2>
          <h4 className="login-form">Project Name</h4>{" "}
          <input
            name="title"
            placeholder="Add Project Title"
            type="text"
            onChange={this.handleChange}
          />{" "}
          <h5>What is this project about?</h5>
          <input
            name="description"
            placeholder="Project Description"
            type="text"
            onChange={this.handleChange}
          />{" "}
          <p />
          <Link to="/user">
            <button
              type="submit"
              className="btn"
              onClick={this.addProject}
              // onClick={() => this.handleClose()}
            >
              Submit
            </button>
          </Link>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewProject;
