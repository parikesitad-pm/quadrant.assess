import * as AppAction from '../Action/AppAction';
import * as InventoryAction from '../Action/InventoryAction';
import * as InventorySelector from '../Selector/InventorySelector';
import * as T from '../types';

import { call, put, select, takeLatest } from 'redux-saga/effects';

import axios from 'axios';
import { toast } from 'react-toastify';

const baseAPI = process.env.REACT_APP_API_URL;

function* fetchInventoryProcess(action) {
  try {
    const { page, size } = action || {};
    yield put(AppAction.processLoading(true));
    const { data } = yield call(
      axios.get,
      `${baseAPI}/InventoryItem/inquiry/${page}/${size}`
    );

    yield put(InventoryAction.fetchInventoryFinished(data.data));
    yield put(AppAction.processLoading(false));
    const totalData = data.totalPages * 10;

    yield put(InventoryAction.setTotalData(totalData));
  } catch (error) {
    yield put(AppAction.processLoading(false));
    Promise.reject(error);
  }
}
function* fetchInventoryByIdProcess(action) {
  try {
    const { id } = action || {};
    yield put(AppAction.processLoading(true));
    const { data } = yield call(axios.get, `${baseAPI}/InventoryItem/${id}`);

    yield put(InventoryAction.setSelectedDataInventory(data));
    yield put(AppAction.processLoading(false));
  } catch (error) {
    yield put(AppAction.processLoading(false));
    Promise.reject(error);
  }
}
function* submitInventoryProcess(action) {
  try {
    const { payload, reset } = action;
    const mode = yield select(InventorySelector.EditMode());
    yield put(AppAction.processLoading(true));
    if (mode === 'edit') {
      yield call(axios.put, `${baseAPI}/InventoryItem/UpdateItem`, {
        ...payload,
      });
    } else if (mode === 'create') {
      yield call(axios.post, `${baseAPI}/InventoryItem/AddItem`, {
        ...payload,
      });
    }
    yield put(InventoryAction.setEditMode('create'));
    yield put(AppAction.openModal('Inventory'));
    toast.success(
      `Inventory ${mode === 'edit' ? 'Updated' : 'Created'} successfully`
    );
    yield put(AppAction.processLoading(false));
    yield put(InventoryAction.setSelectedIdInventory(null));
    yield put(InventoryAction.setSelectedDataInventory({}));
    reset();
    yield put(InventoryAction.fetchInventoryRequested());
  } catch (error) {
    yield put(AppAction.processLoading(false));
    Promise.reject(error);
  }
}

export function* fetchInventoryAction() {
  yield takeLatest(T.FETCH_INVENTORY_REQUESTED, fetchInventoryProcess);
}
export function* fetchInventoryByIdAction() {
  yield takeLatest(
    T.FETCH_INVENTORY_REQUESTED_BY_ID,
    fetchInventoryByIdProcess
  );
}
export function* submitInventoryAction() {
  yield takeLatest(T.ADD_NEW_INVENTORY_REQUESTED, submitInventoryProcess);
}
