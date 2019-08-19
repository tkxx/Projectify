import React, { Component } from "react";
import axios from "axios";
import TasksDisplay from "../TasksDisplay/TasksDisplay";
import Navbar from "../NavBar/NavBar";
import { Modal, Button, Row, Col } from "react-bootstrap";
import "./ProjectCard.scss";

class ProjectCard extends Component {
  constructor() {
    super();

    this.state = {
      project: [],
      modal: false
    };
  }

  componentDidMount() {
    axios
      .get(`/api/projects/${this.props.match.params.id}`)
      .then(res => this.setState({ project: res.data }))
      .catch(err => console.log(err));
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    console.log(this.props.match.params.id);
    console.log(this.state);
    let projectDisplay = this.state.project.map(res => <h1>{res.title}</h1>);
    return (
      <div>
        <Navbar />
        <div className="project-heading">
          <span className="project-title">
            <h1>{projectDisplay}</h1>
            <br />
            <span className="task-display">
              <TasksDisplay
                project_id={this.props.match.params.id}
                className="display-tasks"
              />
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default ProjectCard;
