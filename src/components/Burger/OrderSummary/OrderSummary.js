import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = ({
  ingredients,
  price,
  purchasedCancelled,
  purchasedContinued,
}) => {
  const ingredientSummary = Object.keys(ingredients).map((key) => {
    return (
      <li key={key}>
        {' '}
        <span style={{ textTransform: 'capitalize' }}>{key}</span>:{' '}
        {ingredients[key]}
      </li>
    );
  });

  return (
    <>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>
          Total Price:
          {price.toFixed(2)}
        </strong>
      </p>
      <p>Continue you to Checkout ? </p>
      <Button btnType="Danger" clicked={purchasedCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchasedContinued}>
        CONTINUE
      </Button>
    </>
  );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.shape({
    bacon: PropTypes.number,
    cheese: PropTypes.number,
    meat: PropTypes.number,
    salad: PropTypes.number,
  }).isRequired,
  price: PropTypes.number.isRequired,
  purchasedCancelled: PropTypes.func.isRequired,
  purchasedContinued: PropTypes.func.isRequired,
};
export default OrderSummary;
