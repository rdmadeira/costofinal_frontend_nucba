import { SET_CURRENT_USER } from './userActions';

const INITIAL_STATE = null;

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
};
