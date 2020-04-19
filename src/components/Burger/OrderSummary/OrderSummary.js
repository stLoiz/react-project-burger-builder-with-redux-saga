import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = ({
  ingredients,
  price,
  purchasedCancelled,
  purchasedContinued,
}) => {
  const ingredientSummary = Object.keys(ingredients).map((key) => {
    return (
      <li key={key}>
        {' '}
        <span style={{ textTransform: 'capitalize' }}>{key}</span> :{' '}
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
        <strong>Total Price: {price.toFixed(2)}</strong>
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

export default orderSummary;
