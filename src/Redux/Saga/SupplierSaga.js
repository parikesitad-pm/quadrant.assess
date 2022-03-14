import * as AppAction from '../Action/AppAction';
import * as SupplierAction from '../Action/SupplierAction';
import * as SupplierSelector from '../Selector/SupplierSelector';
import * as T from '../types';

import { call, put, select, takeLatest } from 'redux-saga/effects';

import axios from 'axios';
import { toast } from 'react-toastify';

const baseAPI = process.env.REACT_APP_API_URL;

function* fetchSupplierProcess(action) {
  try {
    const { page, size } = action || {};
    yield put(AppAction.processLoading(true));
    const { data } = yield call(
      axios.get,
      `${baseAPI}/Supplier/inquiry/${page}/${size}`
    );

    yield put(SupplierAction.fetchSupplierFinished(data?.data));
    yield put(AppAction.processLoading(false));
    const totalData = data.totalPages * 10;

    yield put(SupplierAction.setTotalData(totalData));
  } catch (error) {
    yield put(AppAction.processLoading(false));
    Promise.reject(error);
  }
}
function* addSupplierProcess(action) {
  try {
    const { payload, reset } = action || {};
    const selectedData = yield select(SupplierSelector.SelectedData());
    const editMode = yield select(SupplierSelector.EditMode());
    const id = selectedData.id;
    const {
      name,
      address,
      city,
      postCode,
      contactType,
      contactName,
      contactValue,
    } = payload;
    const contacts = [
      {
        name: contactName,
        contactType: contactType,
        value: contactValue,
      },
    ];
    const data = {
      name,
      address,
      city,
      postCode,
    };
    if (editMode) {
      data.id = id;
    } else if (!editMode && contactType && contactValue && contactName) {
      data.contacts = contacts;
    }

    yield put(AppAction.processLoading(true));
    if (editMode) {
      yield call(axios.put, `${baseAPI}/Supplier/UpdateSupplier`, data);
    } else {
      yield call(axios.post, `${baseAPI}/Supplier/AddSupplier`, data);
    }
    yield put(AppAction.processLoading(false));
    toast.success(`Supplier ${editMode ? 'Updated' : 'Created'}`);
    reset();
    yield put(AppAction.openModal('Supplier'));
    yield put(SupplierAction.fetchSupplierRequested());
  } catch (error) {
    yield put(AppAction.processLoading(false));
    Promise.reject(error);
  }
}

export function* fetchSupplierAction() {
  yield takeLatest(T.FETCH_SUPPLIER_REQUESTED, fetchSupplierProcess);
}
export function* addSupplierAction() {
  yield takeLatest(T.ADD_NEW_SUPPLIER_REQUESTED, addSupplierProcess);
}
