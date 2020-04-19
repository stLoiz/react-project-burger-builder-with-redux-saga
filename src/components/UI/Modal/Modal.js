import React from 'react';

import classes from './Modal.module.css';

const modal = ({ children }) => <div className={classes.Modal}>{children}</div>;

export default modal;
