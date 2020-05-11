import PropTypes from 'prop-types';
import React from 'react';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = ({ drawerToggleClicked, isAuth }) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={isAuth} />
    </nav>
  </header>
);

Toolbar.propTypes = {
  drawerToggleClicked: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};
export default Toolbar;
