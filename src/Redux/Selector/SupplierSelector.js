import { createSelector } from 'reselect';

const SupplierSelector = (state) => state.Supplier;

// SELECTOR OTHER
export const List = () =>
  createSelector(SupplierSelector, (state) => state.list);
export const SelectedData = () =>
  createSelector(SupplierSelector, (state) => state.selectedData);
export const Total = () =>
  createSelector(SupplierSelector, (state) => state.totalData);
export const Page = () =>
  createSelector(SupplierSelector, (state) => state.page);
export const Size = () =>
  createSelector(SupplierSelector, (state) => state.size);
export const EditMode = () =>
  createSelector(SupplierSelector, (state) => state.edit);
