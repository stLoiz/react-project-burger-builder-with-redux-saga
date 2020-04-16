import React from 'react';

import classes from './Layout.module.css';

const layout = ({ children }) => (
  <>
    <div> Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}> {children}</main>
  </>
);

export default layout;
