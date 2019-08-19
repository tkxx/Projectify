import React, { Component } from "react";
import axios from "axios";

class Logout extends Component {
  logout = e => {
    e.preventDefault();
    axios.get("/auth/logout").then(res => {
      console.log(res);
    });
  };
  render() {
    return <div />;
  }
}

export default Logout;
