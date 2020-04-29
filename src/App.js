import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Layout from './hoc/Layout/Layout';
import * as actionCreators from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} exact />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actionCreators.checkAuthState()),
  };
};
export default connect(null, mapDispatchToProps)(App);
