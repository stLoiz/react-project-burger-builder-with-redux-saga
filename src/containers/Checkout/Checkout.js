import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const Checkout = ({ history, ings, purchased, match }) => {
  const checkoutCancelHandler = () => {
    history.goBack();
  };

  const checkoutContinueHandler = () => {
    history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;
  if (ings) {
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
    summary = (
      <>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ings}
          checkoutCancelled={checkoutCancelHandler}
          checkoutContinued={checkoutContinueHandler}
        />

        <Route path={`${match.path}/contact-data`} component={ContactData} />
      </>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

Checkout.propTypes = {
  /*
   * Routing props
   */
  history: PropTypes.shape({
    goBack: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
export default connect(mapStateToProps)(Checkout);
