import React, { Component } from 'react';

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchasable: sum > 0,
    });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      // price should be calculated on the server to make sure
      // that user is not manipulating the code before sending it and manipulates the price
      price: this.state.totalPrice,
      //add other dummy data
      customer: {
        name: 'Stella',
        address: {
          street: 'Teststreet 8',
          zipCode: '3456',
          country: 'London',
        },
        email: 'tests@test.com',
      },
      deliveryMethod: 'fastest',
    };

    //as we are using firebase for the backend we need to use an endpoint with '.json'
    axios
      .post('/orders.json', order)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
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
          {this.state.loading && <Spinner />}
          {!this.state.loading && (
            <OrderSummary
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              purchasedCancelled={this.purchaseCancelHandler}
              purchasedContinued={this.purchaseContinueHandler}
            />
          )}
        </Modal>
        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls
          disabled={disabledInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </>
    );
  }
}

export default BurgerBuilder;
