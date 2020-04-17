import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const buildControls = ({ controls }) => {
  return (
    <div className={classes.buildControls}>
      {controls.map(control => (
        <BuildControl key={control.label} label={control.label} />;
  ))}
    </div>
  );
};

export default buildControls;
