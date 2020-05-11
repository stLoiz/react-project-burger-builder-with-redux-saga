import PropTypes from 'prop-types';
import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
  {
    label: 'Salad',
    type: 'salad',
  },
  {
    label: 'Bacon',
    type: 'bacon',
  },
  {
    label: 'Cheese',
    type: 'cheese',
  },
  {
    label: 'Meat',
    type: 'meat',
  },
];

const BuildControls = ({
  disabled,
  isAuth,
  ingredientAdded,
  ingredientRemoved,
  ordered,
  price,
  purchasable,
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price:
        <strong>{price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => ingredientAdded(control.type)}
          removed={() => {
            ingredientRemoved(control.type);
          }}
          disabled={disabled[control.type]}
        />
      ))}
      <button
        type="button"
        className={classes.OrderButton}
        disabled={!purchasable}
        onClick={ordered}
      >
        {isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  );
};
BuildControls.defaultProps = {
  price: 4,
};
BuildControls.propTypes = {
  disabled: PropTypes.shape({
    bacon: PropTypes.bool,
    cheese: PropTypes.bool,
    meat: PropTypes.bool,
    salad: PropTypes.bool,
  }).isRequired,
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  ordered: PropTypes.func.isRequired,
  price: PropTypes.number,
  purchasable: PropTypes.bool.isRequired,
};
export default BuildControls;
