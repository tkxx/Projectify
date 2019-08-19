import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ModalDialog, Modal } from "react-bootstrap";
import "./NewProject.scss";

class NewProject extends Component {
  constructor() {
    super();

    //NEED HELP HERE TO GET SESSION & PUT TO REDUX
    this.state = {
      user_id: +0,
      title: "",
      description: "",
      isComplete: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount = () => {
    this.getUserSession();
  };

  addProject = e => {
    let { user_id, title, isComplete, description } = this.state;
    axios
      .post("/api/projects", { user_id, title, isComplete, description })
      .then(res => console.log(res))
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
      <div className="new-project-body">
        <ModalDialog centered animation>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="project-title">Project Name</h3>
          </Modal.Title>
          <Modal.Body>
            <h2>{this.state.title}</h2>
            <input
              name="title"
              placeholder="Add Project Title"
              type="text"
              onChange={this.handleChange}
            />{" "}
            <p />
            <span className="project-description">
              <h5>What is this project about?</h5>
              <input
                name="description"
                placeholder="Project Description"
                type="text"
                onChange={this.handleChange}
              />{" "}
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Link to="/user">
              <button className="btn" onClick={this.addProject}>
                Submit
              </button>
            </Link>
          </Modal.Footer>
        </ModalDialog>
      </div>
    );
  }
}

export default NewProject;
