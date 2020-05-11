import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavigationItem = ({ children, link, exact }) => (
  <li className={classes.NavigationItem}>
    <NavLink to={link} activeClassName={classes.active} exact={exact}>
      {children}
    </NavLink>
  </li>
);

NavigationItem.defaultProps = {
  exact: false,
};
NavigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  exact: PropTypes.bool,
  link: PropTypes.string.isRequired,
};
export default NavigationItem;
