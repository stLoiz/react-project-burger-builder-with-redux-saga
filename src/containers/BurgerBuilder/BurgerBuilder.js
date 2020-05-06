import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actionCreators from '../../store/actions/index.js';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../components/UI/Modal/Modal';

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();
  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const onInitIngredients = useCallback(
    () => dispatch(actionCreators.initIngredients()),
    [dispatch],
  );

  const onIngredientAdded = (ingName) => {
    dispatch(actionCreators.addIngredient(ingName));
  };

  const onIngredientRemoved = (ingName) =>
    dispatch(actionCreators.removeIngredient(ingName));

  const onInitPurchase = () => dispatch(actionCreators.purchaseInit());

  const onSetAuthRedirectPath = (path) =>
    dispatch(actionCreators.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {ings && (
          <OrderSummary
            ingredients={ings}
            price={totalPrice}
            purchasedCancelled={purchaseCancelHandler}
            purchasedContinued={purchaseContinueHandler}
          />
        )}
      </Modal>

      {error && <p>Something went wrong</p>}
      {ings && (
        <>
          <Burger ingredients={ings}></Burger>
          <BuildControls
            disabled={disabledInfo}
            isAuth={isAuthenticated}
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            ordered={purchaseHandler}
            price={totalPrice}
            purchasable={updatePurchaseState(ings)}
          />
        </>
      )}
    </>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
