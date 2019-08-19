import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import "./TasksDisplay.scss";
import TaskCard from "../TaskCard/TaskCard";

import ProjectCard from "../ProjectCard/ProjectCard";

class TaskDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proj_id: +this.props.project_id,
      tasks: [],
      input: "",
      isComplete: false
    };
    this.inputTask = this.inputTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    // this.finishedProject = this.finishedProject.bind(this);
  }

  inputTask(value) {
    this.setState({ input: value });
    console.log(value);
  }

  componentDidMount() {
    axios
      .get(`/api/tasks/${this.props.project_id}`)
      .then(res => {
        this.setState({ tasks: res.data });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  addTask() {
    let { proj_id, input, isComplete } = this.state;
    console.log(this.state);
    axios
      .post("/api/tasks", { proj_id, input, isComplete })
      .then(res => {
        this.setState({ tasks: res.data, input: "" });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  //DELETE AS PUT DUE TO TWO PARAMETERS
  deleteTask(proj_id, task_id) {
    // console.log(id);
    axios
      .put(`/api/projects/${proj_id}`, { task_id })
      .then(res => {
        this.setState({ tasks: res.data });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  finishedProject() {
    this.setState({ isComplete: !false });
    // let { isComplete } = this.state;
    // axios.put(`/api/projects/${this.props.project_id}`, isComplete);
  }

  render() {
    console.log(this.state);
    console.log(this.props);

    return (
      <div>
        <div className="input-field">
          <input
            className="project-tasks"
            placeholder="Add new task"
            value={this.state.input}
            type="text"
            onChange={e => this.inputTask(e.target.value)}
          />
          <Button variant="light" className="btn" onClick={this.addTask}>
            Add Task
          </Button>{" "}
        </div>
        <div className="project-list">
          {this.state.tasks.map(card => {
            console.log(card);
            return (
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                </InputGroup.Prepend>
                <ListGroup className="list-group">
                  <ListGroup.Item className="list-group-item" type="checkbox">
                    {card.task}{" "}
                    <Button
                      variant="light"
                      className="btn"
                      onClick={() => this.deleteTask(card.proj_id, card.id)}
                    >
                      🗑️
                      {/* Delete */}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </InputGroup>
            );
          })}
        </div>
        <div className="bottom-buttons">
          <Link to="/user">
            <Button variant="light" className="btn">
              Save
            </Button>
          </Link>
          <Button
            variant="light"
            className="btn"
            onClick={this.finishedProject}
          >
            Project Complete!
          </Button>
        </div>
      </div>
    );
  }
}

export default TaskDisplay;
