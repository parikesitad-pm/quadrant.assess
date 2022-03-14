import * as T from '../types';

const initialState = {
  loading: false,
  showModalSupplier: false,
};

export default function AppReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case T.SET_LOADING: {
      newState.loading = action.isLoading;
      return { ...newState };
    }
    case T.SET_OPEN_MODAL: {
      const openModalAction = action;
      const component = openModalAction.component;
      newState[`showModal${component}`] = !state[`showModal${component}`];
      return { ...newState };
    }

    default:
      return state;
  }
}
