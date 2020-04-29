import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index.js';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../components/UI/Modal/Modal';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }
  updatePurchaseState = () => {
    const sum = Object.keys(this.props.ings)
      .map((key) => {
        return this.props.ings[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();

    this.props.history.push('/checkout');
    //encode ingredients into query params
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       '=' +
    //       encodeURIComponent(this.state.ingredients[i]),
    //   );
    // }
    // queryParams.push('price=' + this.props.totalPrice);
    // const queryString = queryParams.join('&');
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString,
    // });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {this.props.ings && (
            <OrderSummary
              ingredients={this.props.ings}
              price={this.props.totalPrice}
              purchasedCancelled={this.purchaseCancelHandler}
              purchasedContinued={this.purchaseContinueHandler}
            />
          )}
        </Modal>

        {this.props.error && <p>Something went wrong</p>}
        {this.props.ings && (
          <>
            <Burger ingredients={this.props.ings}></Burger>
            <BuildControls
              disabled={disabledInfo}
              isAuth={this.props.isAuthenticated}
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              ordered={this.purchaseHandler}
              price={this.props.totalPrice}
              purchasable={this.updatePurchaseState()}
            />
          </>
        )}
      </>
    );
  }
}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));
