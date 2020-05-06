import React, { useState } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import { updateObject, checkValidity } from '../../../helpers/utility';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';
import classes from './ContactData.module.css';

const ContactData = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [orderForm, setOrderForm] = useState({
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
  });

  const orderHandler = (event) => {
    // add prevent default to prevent sending the request and reload the page
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: props.ings,
      // price should be calculated on the server to make sure
      // that user is not manipulating the code before sending it and manipulates the price
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token);
  };

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedElementForm = updateObject(orderForm[inputIdentifier], {
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation,
      ),
      value: event.target.value,
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedElementForm,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setFormIsValid(formIsValid);
    setOrderForm(updatedOrderForm);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {props.loading && <Spinner />}
      {!props.loading && (
        <form onSubmit={orderHandler}>
          {formElementsArray.map((formElement) => (
            <Input
              changed={(event) => inputChangeHandler(event, formElement.id)}
              elementConfig={formElement.config.elementConfig}
              elementType={formElement.config.elementType}
              invalid={!formElement.config.valid}
              key={formElement.id}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              value={formElement.config.value}
            />
          ))}

          <Button btnType="Success" disabled={!formIsValid}>
            Order
          </Button>
        </form>
      )}
    </div>
  );
};

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
