import React, { Component } from "react";
import "../TasksDisplay/TasksDisplay.scss";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

class TaskCard extends Component {
  constructor() {
    super();

    this.state = {
      tasks: []
    };
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

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div>
        {this.state.tasks.map(card => {
          console.log(card);
          return (
            <ListGroup className="list-group">
              <ListGroup.Item className="list-group-item">
                {card.task}{" "}
                <button
                  className="btn"
                  onClick={() => this.deleteTask(card.proj_id, card.id)}
                >
                  🗑️
                  {/* Delete */}
                </button>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </div>
    );
  }
}

export default TaskCard;
