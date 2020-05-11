import PropTypes from 'prop-types';
import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = ({
  checkoutCancelled,
  checkoutContinued,
  ingredients,
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Danger" clicked={checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

CheckoutSummary.propTypes = {
  checkoutCancelled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
  ingredients: PropTypes.shape({
    salad: PropTypes.number,
    meat: PropTypes.number,
    bacon: PropTypes.number,
    cheese: PropTypes.number,
  }).isRequired,
};
export default CheckoutSummary;
