import PropTypes from 'prop-types';
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

const ContactData = ({
  ings,
  totalPrice,
  userId,
  onOrderBurger,
  token,
  loading,
}) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your name',
        id: 'name',
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
        id: 'address',
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
        id: 'post code',
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
        id: 'country',
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
        id: 'email',
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
    Object.keys(orderForm).forEach((formElementIdentifier) => {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    });

    const order = {
      ingredients: ings,
      // price should be calculated on the server to make sure
      // that user is not manipulating the code before sending it and manipulates the price
      price: totalPrice,
      orderData: formData,
      userId,
    };
    onOrderBurger(order, token);
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

    let isFormValid = true;
    Object.keys(updatedOrderForm).map((inpIdentifier) => {
      isFormValid = updatedOrderForm[inpIdentifier].valid && isFormValid;
      return isFormValid;
    });

    setFormIsValid(isFormValid);
    setOrderForm(updatedOrderForm);
  };

  const formElementsArray = [];
  Object.keys(orderForm).map((key) => {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
    return formElementsArray;
  });

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {loading && <Spinner />}
      {!loading && (
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

          <Button btnType="Success" type="submit" disabled={!formIsValid}>
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

ContactData.defaultProps = {
  loading: false,
  ings: null,
  onOrderBurger: () => {},
  totalPrice: 4,
  token: null,
  userId: null,
};

ContactData.propTypes = {
  loading: PropTypes.bool,
  ings: PropTypes.shape({
    bacon: PropTypes.number,
    salad: PropTypes.number,
    cheese: PropTypes.number,
    meat: PropTypes.number,
  }),
  onOrderBurger: PropTypes.func,
  totalPrice: PropTypes.number,
  token: PropTypes.string,
  userId: PropTypes.string,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(ContactData, axios));
