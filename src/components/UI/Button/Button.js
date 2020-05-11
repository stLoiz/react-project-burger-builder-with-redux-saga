import PropTypes from 'prop-types';
import React from 'react';

import classes from './Button.module.css';

const Button = ({ btnType, children, clicked, disabled, type }) => {
  let buttonType;
  if (type === 'button') {
    buttonType = (
      <button
        disabled={disabled}
        type="button"
        className={[classes.Button, classes[btnType]].join(' ')}
        onClick={clicked}
      >
        {children}
      </button>
    );
  }

  if (type === 'submit') {
    buttonType = (
      <button
        disabled={disabled}
        type="submit"
        className={[classes.Button, classes[btnType]].join(' ')}
        onClick={clicked}
      >
        {children}
      </button>
    );
  }
  return buttonType;
};

Button.defaultProps = {
  btnType: '',
  children: null,
  clicked: () => {},
  disabled: false,
  type: 'button',
};
Button.propTypes = {
  btnType: PropTypes.string,
  children: PropTypes.node,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};
export default Button;
