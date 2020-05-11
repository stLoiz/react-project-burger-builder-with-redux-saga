import PropTypes from 'prop-types';
import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients }) => {
  // transform object into array in order to use map function
  // Object.keys extracts the keys of an object and turns that into an array
  let transformIngredients = Object.keys(ingredients)
    .map((igKey) => {
      // return a new array which will have length equal to the values of the key
      // return [...Array(ingredients[igKey])];
      // then map through the array in order to display the amount of the ingredient
      return [...Array(ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformIngredients.length === 0) {
    transformIngredients = <p> Please Start Adding Ingredients </p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
Burger.propTypes = {
  ingredients: PropTypes.shape({
    bacon: PropTypes.number,
    cheese: PropTypes.number,
    meat: PropTypes.number,
    salad: PropTypes.number,
  }).isRequired,
};
export default Burger;
