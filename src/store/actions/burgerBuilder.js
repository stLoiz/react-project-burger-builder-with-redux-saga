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

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
  };
};
