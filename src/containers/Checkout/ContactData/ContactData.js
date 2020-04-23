import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Post code',
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: '',
      },
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
  inputChangeHandler = (event, inputIdentifier) => {
    //clone in immutable way by using spread
    const updatedOrderForm = { ...this.state.orderForm };
    //clone deeper in immutable way
    const updatedElementForm = { ...updatedOrderForm[inputIdentifier] };

    updatedElementForm.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedElementForm;
    this.setState({ orderForm: updatedOrderForm });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    // console.log(formElementsArray);
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.loading && <Spinner />}
        {!this.state.loading && (
          <form>
            {formElementsArray.map((formElement) => (
              <Input
                changed={(event) =>
                  this.inputChangeHandler(event, formElement.id)
                }
                elementConfig={formElement.config.elementConfig}
                elementType={formElement.config.elementType}
                key={formElement.id}
                value={formElement.config.value}
              />
            ))}

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
