import * as T from '../types';

export function fetchInventoryRequested(page = 1, size = 10) {
  return {
    type: T.FETCH_INVENTORY_REQUESTED,
    page,
    size,
  };
}

export function fetchInventoryFinished(data) {
  return {
    type: T.FETCH_INVENTORY_FINISHED,
    data,
  };
}

export function fetchInventoryByIdRequested(id) {
  return {
    type: T.FETCH_INVENTORY_REQUESTED_BY_ID,
    id,
  };
}

export function setSelectedDataInventory(data) {
  return {
    type: T.SET_INVENTORY_DETAILS,
    data,
  };
}
export function setSelectedIdInventory(id) {
  return {
    type: T.SET_INVENTORY_ID,
    id,
  };
}

export function submitInventoryRequested(payload, reset) {
  return {
    type: T.ADD_NEW_INVENTORY_REQUESTED,
    payload,
    reset,
  };
}

export function setTotalData(total) {
  return {
    type: T.SET_TOTAL_DATA_INVENTORY,
    total,
  };
}
export function setCurrentPage(page) {
  return {
    type: T.SET_CURRENT_PAGE_INVENTORY,
    page,
  };
}
export function setSizePerPage(size) {
  return {
    type: T.SET_SIZE_PER_PAGE_INVENTORY,
    size,
  };
}
export function setEditMode(edit) {
  return {
    type: T.SET_EDIT_INVENTORY,
    edit,
  };
}
