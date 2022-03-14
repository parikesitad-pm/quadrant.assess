import { addSupplierAction, fetchSupplierAction } from './SupplierSaga';
import { all, fork } from 'redux-saga/effects';
import {
  fetchInventoryAction,
  fetchInventoryByIdAction,
  submitInventoryAction,
} from './InventorySaga';

export default function* saga() {
  yield all([
    fork(fetchSupplierAction),
    fork(addSupplierAction),

    fork(fetchInventoryAction),
    fork(fetchInventoryByIdAction),
    fork(submitInventoryAction),
  ]);
}
