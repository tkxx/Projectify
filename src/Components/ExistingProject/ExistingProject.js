import React, { Component } from "react";
import TasksDisplay from "../TasksDisplay/TasksDisplay";
import axios from "axios";

class ProjectCard extends Component {
  // componentDidMount() {
  //   axios
  //     .get(`/api/projects/${id}`) WHERE BOOL == FALSE
  //     .then(res.data)
  //     .catch(err => console.log(err));
  // }

  render() {
    return (
      <div>
        <div className="map-cards">Existing Project BOOL == FALSE</div>
      </div>
    );
  }
}

export default ProjectCard;
