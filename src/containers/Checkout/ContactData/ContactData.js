import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    // add prevent default to prevent sending the request and reload the page
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      // price should be calculated on the server to make sure
      // that user is not manipulating the code before sending it and manipulates the price
      price: this.props.price,
      //add other dummy data
      customer: {
        name: 'Stella',
        address: {
          street: 'Teststreet 8',
          zipCode: '3456',
          country: 'London',
        },
        email: 'tests@test.com',
      },
      deliveryMethod: 'fastest',
    };

    //as we are using firebase for the backend we need to use an endpoint with '.json'
    axios
      .post('/orders.json', order)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.loading && <Spinner />}
        {!this.state.loading && (
          <form>
            <input
              className={classes.Input}
              type="text"
              name="name"
              placeholder="Your name"
            />
            <input
              className={classes.Input}
              type="email"
              name="email"
              placeholder="Your email"
            />
            <input
              className={classes.Input}
              type="text"
              name="street"
              placeholder="Your street"
            />
            <input
              className={classes.Input}
              type="text"
              name="postCode"
              placeholder="Your post code"
            />
            <Button btnType="Success" clicked={this.orderHandler}>
              Order
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default ContactData;
