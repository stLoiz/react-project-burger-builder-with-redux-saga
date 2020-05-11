import PropTypes from 'prop-types';
import React from 'react';

import classes from './Backdrop.module.css';

const Backdrop = ({ show, clicked }) => {
  return show ? (
    <div
      className={classes.Backdrop}
      role="button"
      tabIndex={0}
      aria-label="backDrop"
      onKeyDown={clicked}
      onClick={clicked}
    />
  ) : null;
};

Backdrop.defaultProps = {
  show: false,
};
Backdrop.propTypes = {
  show: PropTypes.bool,
  clicked: PropTypes.func.isRequired,
};
export default Backdrop;
