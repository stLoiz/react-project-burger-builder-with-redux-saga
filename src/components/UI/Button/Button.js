import React from 'react';

import classes from './Button.module.css';

const button = ({ btnType, children, clicked, disabled }) => (
  <button
    disabled={disabled}
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clicked}
  >
    {children}
  </button>
);

export default button;
