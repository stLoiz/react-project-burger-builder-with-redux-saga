import PropTypes from 'prop-types';
import React from 'react';

import classes from './Input.module.css';

const Input = ({
  changed,
  elementConfig,
  elementType,
  invalid,
  label,
  shouldValidate,
  touched,
  value,
}) => {
  let inputElement = null;

  const { type, placeholder, options, id } = elementConfig;
  const inputClasses = [classes.Input];

  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (elementType) {
    case 'input':
      inputElement = (
        <>
          {label && (
            <label htmlFor={id} className={classes.Label}>
              {label}
            </label>
          )}
          <input
            className={inputClasses.join(' ')}
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={changed}
            value={value}
          />
        </>
      );

      break;
    case 'textarea':
      inputElement = (
        <>
          {label && (
            <label htmlFor={id} className={classes.Label}>
              {label}
            </label>
          )}
          <textarea
            id={id}
            className={inputClasses.join(' ')}
            placeholder={placeholder}
            onChange={changed}
            value={value}
          />
        </>
      );
      break;
    case 'select':
      inputElement = (
        <>
          {label && (
            <label htmlFor={id} className={classes.Label}>
              {label}
            </label>
          )}
          <select
            className={inputClasses.join(' ')}
            value={value}
            onChange={changed}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>
        </>
      );
      break;
    default:
      inputElement = (
        <>
          {label && (
            <label htmlFor={id} className={classes.Label}>
              {label}
            </label>
          )}
          <input
            id={id}
            className={inputClasses.join(' ')}
            placeholder={placeholder}
            onChange={changed}
            value={value}
          />
        </>
      );
  }

  return <div className={classes.Input}>{inputElement}</div>;
};
Input.defaultProps = {
  invalid: false,
  label: '',
  shouldValidate: {},
  touched: false,
  value: '',
};
Input.propTypes = {
  changed: PropTypes.func.isRequired,
  elementConfig: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  elementType: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  label: PropTypes.string,
  shouldValidate: PropTypes.shape({ required: PropTypes.bool }),
  touched: PropTypes.bool,
  value: PropTypes.string,
};
export default Input;
