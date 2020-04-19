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

const buildControls = ({
  disabled,
  ingredientAdded,
  ingredientRemoved,
  price,
  purchasable,
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{price.toFixed(2)}</strong>
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
      <button className={classes.OrderButton} disabled={!purchasable}>
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;