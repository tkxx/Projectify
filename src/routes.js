import React from "react";
import { Switch, Route } from "react-router-dom";
import Logout from "./Components/Logout/Logout";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Homepage from "./Components/Homepage/Homepage";
import Donate from "./Components/Donate/Donate";
import ProjectCard from "./Components/ProjectCard/ProjectCard";
import NewProject from "./Components/NewProject/NewProject";

export default (
  <Switch>
    <Route path="/taskcard" component={NewProject} />
    <Route path="/project/:id" component={ProjectCard} />
    <Route path="/donate" component={Donate} />
    <Route path="/logout" component={Logout} />
    <Route path="/user/" component={Dashboard} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route exact path="/" component={Homepage} />
  </Switch>
);
