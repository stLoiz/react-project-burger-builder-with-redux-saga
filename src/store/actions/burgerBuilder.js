import * as actionTypes from './actionTypes';

export const addIngredient = (value) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: value,
  };
};

export const removeIngredient = (value) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: value,
  };
};
