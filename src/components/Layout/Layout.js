import React from 'react';

import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = ({ children }) => (
  <>
    <Toolbar />
    <SideDrawer />
    <main className={classes.Content}> {children}</main>
  </>
);

export default layout;
