import PropTypes from 'prop-types';
import React from 'react';

import classes from './BuildControl.module.css';

const BuildControl = ({ label, added, removed, disabled }) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button
        type="button"
        className={classes.Less}
        onClick={removed}
        disabled={disabled}
      >
        Less
      </button>
      <button type="button" onClick={added} className={classes.More}>
        More
      </button>
    </div>
  );
};

BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired,
  removed: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
export default BuildControl;
