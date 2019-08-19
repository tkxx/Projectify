import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";
import donatecoins from "../Donate/donatecoins.svg";
import "./CheckoutForm.scss";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({
      name: this.props.username
    });
    console.log(token);
    console.log(this.state);
    console.log(this.props);
    let response = await axios.post("/charge", { token: token.id });
    console.log(response);
    if (response.data.status === "succeeded") this.setState({ complete: true });
    if (response.data.status === "succeeded")
      console.log("Purchase Complete! Woohoo!");
  }

  render() {
    if (this.state.complete)
      return (
        <div>
          <img src={donatecoins} alt text="piggybank" />
          <span className="purchase-complete">
            <h3>Thank you for your contribution!</h3>
          </span>
        </div>
      );
    return (
      <div className="checkout">
        <p className="purchase-question">
          Would you like to complete the purchase?
        </p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
