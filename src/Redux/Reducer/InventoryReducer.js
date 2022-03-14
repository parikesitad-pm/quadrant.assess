import * as T from '../types';

const initialState = {
  list: [],
  selectedData: {},
  selectedId: null,
  totalData: 0,
  page: 1,
  size: 10,
  edit: 'create',
};

export default function InventoryReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case T.FETCH_INVENTORY_FINISHED: {
      newState.list = action.data;
      return { ...newState };
    }
    case T.SET_INVENTORY_DETAILS: {
      newState.selectedData = action.data;
      return { ...newState };
    }
    case T.SET_INVENTORY_ID: {
      newState.selectedId = action.id;
      return { ...newState };
    }
    case T.SET_TOTAL_DATA_INVENTORY: {
      newState.totalData = action.total;
      return { ...newState };
    }
    case T.SET_CURRENT_PAGE_INVENTORY: {
      newState.page = action.page;
      return { ...newState };
    }
    case T.SET_SIZE_PER_PAGE_INVENTORY: {
      newState.size = action.size;
      return { ...newState };
    }
    case T.SET_EDIT_INVENTORY: {
      newState.edit = action.edit;
      return { ...newState };
    }

    default:
      return state;
  }
}
