import React from 'react';

const orderSummary = ({ ingredients }) => {
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
      <p>Continue you to Checkout ? </p>
    </>
  );
};

export default orderSummary;
