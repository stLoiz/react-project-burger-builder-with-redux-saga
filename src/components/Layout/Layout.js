import React from 'react';

const layout = ({ children }) => (
  <>
    <div> Toolbar, SideDrawer, Backdrop</div>
    <main> {children}</main>
  </>
);

export default layout;
