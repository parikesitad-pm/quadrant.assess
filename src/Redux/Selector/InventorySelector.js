import { createSelector } from 'reselect';

const InventorySelector = (state) => state.Inventory;

export const List = () =>
  createSelector(InventorySelector, (state) => state.list);
export const SelectedData = () =>
  createSelector(InventorySelector, (state) => state.selectedData);
export const SelectedId = () =>
  createSelector(InventorySelector, (state) => state.selectedId);
export const Total = () =>
  createSelector(InventorySelector, (state) => state.totalData);
export const CurrentPage = () =>
  createSelector(InventorySelector, (state) => state.page);
export const SizePerPage = () =>
  createSelector(InventorySelector, (state) => state.size);
export const EditMode = () =>
  createSelector(InventorySelector, (state) => state.edit);
