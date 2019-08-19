import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import NavBar from "../NavBar/NavBar";
import donatecoins from "../Donate/donatecoins.svg";
import { Container, Row, Col } from "react-bootstrap";
import "./Donate.scss";

class Donate extends Component {
  render() {
    return (
      <div className="body-donate">
        <div className="body-wallpaper">
          <NavBar />
          <Container>
            <Row>
              <Col>
                <div className="donate-plea">
                  <h2>
                    <em>This project won't pay for itself...</em>
                  </h2>
                </div>
                <span className="donate-subheading">
                  I'm not getting paid during this bootcamp.
                </span>
              </Col>
              <Col>
                <div className="stripe">
                  <StripeProvider apiKey="pk_test_NjMaWbuvVW9eQwVoIqCWIJ6N00xVafOn6k">
                    <div className="example">
                      <h1 className="donate-heading">Donate Your $money</h1>
                      <Elements>
                        <CheckoutForm />
                      </Elements>
                    </div>
                  </StripeProvider>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Donate;
