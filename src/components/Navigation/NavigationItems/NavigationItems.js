import PropTypes from 'prop-types';
import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({ isAuthenticated }) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>

    {isAuthenticated ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}
    {isAuthenticated ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Sign in/up</NavigationItem>
    )}
  </ul>
);

navigationItems.propTypes = {
  /*
   * bool showing if the user is logged in or not
   */
  isAuthenticated: PropTypes.bool.isRequired,
};

export default navigationItems;
