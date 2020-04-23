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
        touched: false,
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        touched: false,
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Post code',
        },
        touched: false,
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 8,
        },
        valid: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        touched: false,
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        touched: false,
        value: '',
        validation: {
          required: true,
        },
        valid: false,
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
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      // price should be calculated on the server to make sure
      // that user is not manipulating the code before sending it and manipulates the price
      price: this.props.price,
      orderData: formData,
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

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }
  inputChangeHandler = (event, inputIdentifier) => {
    //clone in immutable way by using spread
    const updatedOrderForm = { ...this.state.orderForm };
    //clone deeper in immutable way
    const updatedElementForm = { ...updatedOrderForm[inputIdentifier] };

    updatedElementForm.valid = this.checkValidity(
      updatedElementForm.value,
      updatedElementForm.validation,
    );
    updatedElementForm.value = event.target.value;
    updatedElementForm.touched = true;
    updatedOrderForm[inputIdentifier] = updatedElementForm;
    console.log(updatedOrderForm);
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
          <form onSubmit={this.orderHandler}>
            {formElementsArray.map((formElement) => (
              <Input
                changed={(event) =>
                  this.inputChangeHandler(event, formElement.id)
                }
                elementConfig={formElement.config.elementConfig}
                elementType={formElement.config.elementType}
                invalid={!formElement.config.valid}
                key={formElement.id}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                value={formElement.config.value}
              />
            ))}

            <Button btnType="Success">Order</Button>
          </form>
        )}
      </div>
    );
  }
}

export default ContactData;
