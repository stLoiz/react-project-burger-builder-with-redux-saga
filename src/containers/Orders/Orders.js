import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = ({ token, userId, onFetchOrders, loading, orders }) => {
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  return (
    <div>
      {loading && <Spinner />}
      {orders.map((order) => {
        return (
          <Order
            key={order.id}
            price={order.price}
            ingredients={order.ingredients}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actionCreators.fetchOrders(token, userId)),
  };
};

Orders.defaultProps = {
  loading: false,
  orders: [],
};
Orders.propTypes = {
  loading: PropTypes.bool,
  onFetchOrders: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      ingredients: PropTypes.shape({
        salad: PropTypes.number,
        meat: PropTypes.number,
        cheese: PropTypes.number,
        bacon: PropTypes.number,
      }),
      price: PropTypes.number,
    }),
  ),

  /*
   * Token of the user
   */
  token: PropTypes.string.isRequired,

  /*
   * User id use to fetch the orders for this specific user
   */
  userId: PropTypes.string.isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios));
