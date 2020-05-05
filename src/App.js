import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from './components/UI/Spinner/Spinner';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import * as actionCreators from './store/actions/index';

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const App = (props) => {
  useEffect(() => {
    props.onCheckAuthState();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={() => <Checkout />} />
        <Route path="/orders" render={() => <Orders />} />
        <Route path="/auth" render={() => <Auth />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actionCreators.checkAuthState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
