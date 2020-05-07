import reducer from '../auth';
import * as actionTypes from '../../actions/actionTypes';

describe('Reducer Auth', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    };
  });

  it('should return the initial state if state is undefined', () => {
    expect(reducer(undefined, () => {})).toEqual(initialState);
  });
  it('should store token and userId upon login', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        token: 'some-token',
        userId: 'some-userId',
      }),
    ).toEqual({
      token: 'some-token',
      userId: 'some-userId',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});
