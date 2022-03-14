import * as T from '../types';

export function processLoading(isLoading) {
  return {
    type: T.SET_LOADING,
    isLoading,
  };
}
export function openModal(component) {
  return {
    type: T.SET_OPEN_MODAL,
    component,
  };
}
