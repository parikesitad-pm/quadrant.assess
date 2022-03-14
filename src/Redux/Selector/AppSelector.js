import { createSelector } from 'reselect';

const AppSelector = (state) => state.App;

// SELECTOR OTHER
export const Loading = () =>
  createSelector(AppSelector, (state) => state.loading);
export const ShowModal = (component) =>
  createSelector(AppSelector, (state) =>
    state[`showModal${component}`] ? state[`showModal${component}`] : false
  );
