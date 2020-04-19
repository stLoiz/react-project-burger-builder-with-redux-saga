import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = ({ label, added, removed }) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button className={classes.Less} onClick={removed}>
        Less
      </button>
      <button onClick={added} className={classes.More}>
        More
      </button>
    </div>
  );
};

export default buildControl;
