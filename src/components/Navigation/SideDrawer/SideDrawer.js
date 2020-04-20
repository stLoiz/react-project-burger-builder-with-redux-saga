import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = ({ closed, isShown }) => {
  return (
    <>
      <Backdrop show={isShown} clicked={closed} />
      <div className={classes.SideDrawer}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
