import * as T from '../types';

export function fetchSupplierRequested(page = 1, size = 10) {
  return {
    type: T.FETCH_SUPPLIER_REQUESTED,
    size,
    page,
  };
}
export function fetchSupplierFinished(data) {
  return {
    type: T.FETCH_SUPPLIER_FINISHED,
    data,
  };
}
export function addNewSupplierRequested(payload, reset) {
  return {
    type: T.ADD_NEW_SUPPLIER_REQUESTED,
    payload,
    reset,
  };
}
export function updateSupplierRequested(payload) {
  return {
    type: T.UPDATE_SUPPLIER_REQUESTED,
    payload,
  };
}
export function setSelectedData(data) {
  return {
    type: T.SET_SELECTED_DATA_SUPPLIER,
    data,
  };
}
export function setTotalData(total) {
  return {
    type: T.SET_TOTAL_DATA_SUPPLIER,
    total,
  };
}
export function setCurrentPage(page) {
  return {
    type: T.SET_CURRENT_PAGE_SUPPLIER,
    page,
  };
}
export function setSizePerPage(size) {
  return {
    type: T.SET_SIZE_PER_PAGE_SUPPLIER,
    size,
  };
}
export function setEditMode(edit = false) {
  return {
    type: T.SET_EDIT_SUPPLIER,
    edit,
  };
}
