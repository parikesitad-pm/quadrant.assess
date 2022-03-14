import * as T from '../types';

const initialState = {
  list: [],
  selectedData: {},
  totalData: 0,
  page: 1,
  size: 10,
  edit: false,
};

export default function SupplierReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case T.FETCH_SUPPLIER_FINISHED: {
      newState.list = action.data;
      return { ...newState };
    }
    case T.SET_SELECTED_DATA_SUPPLIER: {
      newState.selectedData = action.data;
      return { ...newState };
    }
    case T.SET_TOTAL_DATA_SUPPLIER: {
      newState.totalData = action.total;
      return { ...newState };
    }
    case T.SET_CURRENT_PAGE_SUPPLIER: {
      newState.page = action.page;
      return { ...newState };
    }
    case T.SET_SIZE_PER_PAGE_SUPPLIER: {
      newState.size = action.size;
      return { ...newState };
    }
    case T.SET_EDIT_SUPPLIER: {
      newState.edit = action.edit;
      return { ...newState };
    }

    default:
      return state;
  }
}
