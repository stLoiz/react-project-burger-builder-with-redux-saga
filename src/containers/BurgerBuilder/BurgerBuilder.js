import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index.js';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../components/UI/Modal/Modal';

const BurgerBuilder = ({ onInitIngredients, ...props }) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = () => {
    const sum = Object.keys(props.ings)
      .map((key) => {
        return props.ings[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...props.ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {props.ings && (
          <OrderSummary
            ingredients={props.ings}
            price={props.totalPrice}
            purchasedCancelled={purchaseCancelHandler}
            purchasedContinued={purchaseContinueHandler}
          />
        )}
      </Modal>

      {props.error && <p>Something went wrong</p>}
      {props.ings && (
        <>
          <Burger ingredients={props.ings}></Burger>
          <BuildControls
            disabled={disabledInfo}
            isAuth={props.isAuthenticated}
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            ordered={purchaseHandler}
            price={props.totalPrice}
            purchasable={updatePurchaseState()}
          />
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onIngredientAdded: (ingName) =>
      dispatch(actionCreators.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actionCreators.removeIngredient(ingName)),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actionCreators.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));
