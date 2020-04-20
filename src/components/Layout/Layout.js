import React, { Component } from 'react';

import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component {
  state = {
    showSideDrawer: true,
  };

  sideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <>
        <Toolbar />
        <SideDrawer
          isShown={this.state.showSideDrawer}
          closed={this.sideDrawerHandler}
        />
        <main className={classes.Content}> {this.props.children}</main>
      </>
    );
  }
}
export default Layout;
