import {
  SHOW_ERROR,
} from '../actions';

export const INITIAL_STATE = {
  id: 0,
  message: {},
};

const error = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        id: state.id + 1,
        message: {
          text: action.error.text,
          title: action.error.title
        }
      };
    default:
      return state;
  }
};

export default error;
