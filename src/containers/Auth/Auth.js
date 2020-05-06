import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateObject, checkValidity } from '../../helpers/utility';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';

import classes from './Auth.module.css';

const Auth = ({
  authRedirectPath,
  error,
  isAuthenticated,
  isBurgerBuilt,
  loading,
  onAuth,
  onSetAuthRedirectPath,
}) => {
  const [isSignup, setIsSignup] = useState(true);

  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your email',
      },
      touched: false,
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Your password',
      },
      touched: false,
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
    },
  });

  useEffect(() => {
    if (!isBurgerBuilt && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [isBurgerBuilt, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation,
        ),
        touched: true,
      }),
    });

    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }
  let form = formElementsArray.map((formElement) => (
    <Input
      changed={(event) => inputChangeHandler(event, formElement.id)}
      elementConfig={formElement.config.elementConfig}
      elementType={formElement.config.elementType}
      invalid={!formElement.config.valid}
      key={formElement.id}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      value={formElement.config.value}
    />
  ));

  return (
    <div className={classes.Auth}>
      {loading && <Spinner />}
      {isAuthenticated && <Redirect to={authRedirectPath} />}
      {!loading && error && <p>{error.message}</p>}
      {!loading && (
        <>
          <form onSubmit={submitHandler}>
            {form}
            <Button btnType="Success">Submit</Button>
          </form>
          <Button clicked={switchAuthModeHandler} btnType="Danger">
            Switch to {isSignup ? 'Sign in' : 'Sign up'}
          </Button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isBurgerBuilt: state.burgerBuilder.isBurgerBuilt,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actionCreators.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () =>
      dispatch(actionCreators.setAuthRedirectPath('/')),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
