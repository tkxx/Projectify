import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Toast from "react-bootstrap/Toast";
import { InputGroup, FormControl, Button, Row, Col } from "react-bootstrap";
import "./TasksDisplay.scss";
import toastCoins from "../TasksDisplay/toastCoins.svg";
import { connect } from "react-redux";
import { addTaskCoins } from "../../Redux/reducers/moneybagReducer";

class TaskDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proj_id: +this.props.project_id,
      tasks: [],
      input: "",
      isComplete: false,
      showToast: false
    };
    this.inputTask = this.inputTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleToast = this.handleToast.bind(this);
  }

  inputTask(value) {
    this.setState({ input: value });
    console.log(value);
  }

  handleToast = () => {
    this.setState({ showToast: !this.state.showToast });
    this.props.addTaskCoins();
  };

  handleCloseToast = () => {
    this.setState({ showToast: false });
  };

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
    axios
      .put(`/api/projects/${proj_id}`, { task_id })
      .then(res => {
        this.setState({ tasks: res.data, showToast: false });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  // finishedProject() {
  // this.setState({ isComplete: !false });
  // let { isComplete } = this.state;
  // axios.put(`/api/projects/${this.props.project_id}`, isComplete);
  // }

  render() {
    console.log(this.props);
    return (
      <div>
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "relative",
            minHeight: "100px"
          }}
        >
          <Toast
            style={{
              position: "absolute",
              top: 0,
              right: 0
            }}
            show={this.state.showToast}
            onClose={this.handleCloseToast}
          >
            {/* <Row>
              <Col xs={6}> */}
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Projectify</strong>
            </Toast.Header>
            <Toast.Body>
              Beep boop, you gained 5 points! <img src={toastCoins} />
            </Toast.Body>
            {/* </Col>
            </Row> */}
          </Toast>
        </div>
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
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      onClick={this.handleToast}
                    />
                  </InputGroup.Prepend>
                  <ListGroup className="list-group">
                    <ListGroup.Item
                      className="list-group-item"
                      type="checkbox"
                      onClick={this.handleToast}
                    >
                      {card.task}
                      <a onClick={() => this.deleteTask(card.proj_id, card.id)}>
                        🗑️
                      </a>
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
          </div>
        </div>
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
  { addTaskCoins }
)(TaskDisplay);
