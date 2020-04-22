import React from 'react';

import classes from './Order.module.css';

const order = ({ ingredients, price }) => {
  const ingredientsArr = [];
  for (let ingredientsName in ingredients) {
    ingredientsArr.push({
      name: ingredientsName,
      amount: ingredients[ingredientsName],
    });
  }
  const ingredientOutput = ingredientsArr.map((ing) => {
    return (
      <span className={classes.Ingredient} key={ing.name}>
        {ing.name} ({ing.amount})
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
        Price: <strong>£ {Number.parseFloat(price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
