import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = ({ ingredients }) => {
  // transform object into array in order to use map function
  // Object.keys extracts the keys of an object and turns that into an array
  const transformIngredients = Object.keys(ingredients).map((igKey) => {
    // return a new array which will have length equal to the values of the key
    // return [...Array(ingredients[igKey])];
    // then map through the array in order to display the amount of the ingredient
    return [...Array(ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
