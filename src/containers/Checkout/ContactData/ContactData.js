import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import { updateObject, checkValidity } from '../../../helpers/utility';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';
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
          maxLength: 5,
          isNumeric: true,
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
          isEmail: true,
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
        validation: {},
        valid: true,
        value: 'fastest',
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    // add prevent default to prevent sending the request and reload the page
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      // price should be calculated on the server to make sure
      // that user is not manipulating the code before sending it and manipulates the price
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedElementForm = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation,
        ),
        value: event.target.value,
        touched: true,
      },
    );
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedElementForm,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
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
        {this.props.loading && <Spinner />}
        {!this.props.loading && (
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

            <Button btnType="Success" disabled={!this.state.formIsValid}>
              Order
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actionCreators.purchaseBurger(orderData, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(ContactData, axios));
