import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import mooSpaceship from "../LoadingPage/mooSpaceship.svg";
import "../LoadingPage/LoadingPage.scss";

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;
const DotWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
const Dot = styled.div`
  background-color: #6c7b95;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;

  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`;
class LoadingDots extends Component {
  render() {
    return (
      <div className="loading-page">
        <img src={mooSpaceship} alt="spaceship abducting cow" class="cow" />
        <p />
        <div className="loading-font">Landing</div>
        <DotWrapper>
          <Dot delay="0s" />
          <Dot delay=".1s" />
          <Dot delay=".2s" />
        </DotWrapper>
      </div>
    );
  }
}
export default LoadingDots;
