import React from 'react';

import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
const layout = ({ children }) => (
  <>
    <Toolbar />
    <main className={classes.Content}> {children}</main>
  </>
);

export default layout;
