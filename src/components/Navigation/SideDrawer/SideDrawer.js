import PropTypes from 'prop-types';
import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const SideDrawer = ({ closed, isShown, isAuth }) => {
  const attachedClasses = [classes.SideDrawer, classes.Close];
  if (isShown) {
    attachedClasses.splice(1, 1, classes.Open);
  }

  return (
    <>
      <Backdrop show={isShown} clicked={closed} />
      <div
        className={attachedClasses.join(' ')}
        onKeyDown={closed}
        role="button"
        tabIndex={0}
        onClick={closed}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems isAuthenticated={isAuth} />
        </nav>
      </div>
    </>
  );
};

SideDrawer.propTypes = {
  closed: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
};
export default SideDrawer;
