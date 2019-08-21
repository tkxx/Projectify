import React, { Component } from "react";
import spaceship from "../Dashboard/spaceship.svg";
import ExistingProject from "../ExistingProject/ExistingProject";
import CompletedProjects from "../ProjectStatus/ProjectStatus";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import CardDeck from "react-bootstrap/CardDeck";
import ProjectCard from "../ProjectCard/ProjectCard";
import LoadingPage from "../LoadingPage/LoadingPage";
import NewProject from "../NewProject/NewProject";
import "./Dashboard.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: +0,
      projId: +0,
      projects: [],
      isComplete: false,
      description: "",
      first_name: "",
      username: "",
      isLoading: true,
      showModal: false
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1500);
    this.getProjects();
    this.getUserSession();
  };

  getProjects = () => {
    axios
      .get("/api/projects")
      .then(res => {
        this.setState({ projects: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  getUserSession = () => {
    axios.get("/auth/session").then(res =>
      this.setState({
        id: res.data.id,
        first_name: res.data.first_name,
        username: res.data.username
      })
    );
  };

  deleteProject = id => {
    console.log(id);
    axios
      .delete(`/api/projects/${id}`)
      .then(res => {
        this.setState({ projects: res.data });
      })
      .catch(err => console.log(err));
  };

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    let { showModal } = this.state;

    if (this.state.isLoading) {
      return <LoadingPage />;
    }
    return (
      <div>
        <NavBar />
        <div className="header">
          <span className="heading">
            <h1>Welcome back, {this.state.first_name}</h1>
          </span>
        </div>
        <div className="add-new-proj">
          {/* <Link to="/taskcard"> */}
          <button className="btn" onClick={this.handleModal}>
            + Create New Project
          </button>
          <NewProject
            show={this.state.showModal}
            onHide={this.handleModal}
            handleClose={this.handleModal}
            getProjects={this.getProjects}
          />
          {/* </Link> */}
        </div>
        <div className="card-deck">
          {this.state.projects.map(cards => (
            <Row>
              <Col>
                <CardDeck>
                  <Card border-secondary style={{ width: "12rem" }}>
                    <Card.Img variant="top" src={spaceship} />

                    <Card.Body>
                      <Card.Title className="card-title">
                        <Link to={`/project/${cards.id}`}>{cards.title}</Link>
                      </Card.Title>
                      <Card.Text className="card-description">
                        {cards.description}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Link to="/user/">
                        <button
                          className="btn"
                          onClick={() => this.deleteProject(cards.id)}
                        >
                          Delete
                        </button>
                      </Link>
                    </Card.Footer>
                  </Card>
                </CardDeck>
              </Col>
            </Row>
          ))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
