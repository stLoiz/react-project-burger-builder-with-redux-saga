import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('./orders.json')
      .then((response) => {
        console.log(response.data);
        this.setState({ orders: response.data, loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <Order />
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;
