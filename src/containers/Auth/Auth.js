import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateObject, checkValidity } from '../../helpers/utility';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';

import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.isBurgerBuilt && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation,
        ),
        touched: true,
      }),
    });

    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();

    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup,
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementsArray.map((formElement) => (
      <Input
        changed={(event) => this.inputChangeHandler(event, formElement.id)}
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
        {this.props.loading && <Spinner />}
        {this.props.isAuthenticated && (
          <Redirect to={this.props.authRedirectPath} />
        )}
        {!this.props.loading && this.props.error && (
          <p>{this.props.error.message}</p>
        )}
        {!this.props.loading && (
          <>
            <form onSubmit={this.submitHandler}>
              {form}
              <Button btnType="Success">Submit</Button>
            </form>
            <Button clicked={this.switchAuthModeHandler} btnType="Danger">
              Switch to {this.state.isSignup ? 'Sign in' : 'Sign up'}
            </Button>
          </>
        )}
      </div>
    );
  }
}

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
