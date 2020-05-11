import PropTypes from 'prop-types';
import React from 'react';

import classes from './Order.module.css';

const Order = ({ ingredients, price }) => {
  const ingredientsArr = [];
  Object.keys(ingredients).map((ingredientsName) => {
    ingredientsArr.push({
      name: ingredientsName,
      amount: ingredients[ingredientsName],
    });
    return ingredientsArr;
  });

  const ingredientOutput = ingredientsArr.map((ing) => {
    return (
      <span className={classes.Ingredient} key={ing.name}>
        {ing.name}({ing.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>
        Ingredients:
        {ingredientOutput}
      </p>
      <p>
        Price:
        <strong> £{Number.parseFloat(price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

Order.defaultProps = {
  ingredients: null,
  price: null,
};
Order.propTypes = {
  ingredients: PropTypes.shape({}),
  price: PropTypes.number,
};
export default Order;
