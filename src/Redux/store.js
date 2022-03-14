import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import App from './Reducer/AppReducer';
import Inventory from './Reducer/InventoryReducer';
import Saga from './Saga/SagaMiddleware';
import Supplier from './Reducer/SupplierReducer';
import _ from 'lodash';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const combinedReducer = combineReducers({ App, Inventory, Supplier });

const resetEnhancer = (rootReducer) => (state, action) => {
  if (action.type !== 'LOGOUT') {
    return rootReducer(state, action);
  }
  const newState = rootReducer(undefined, {});
  newState.router = state.router;
  return newState;
};

const persistedReducer = persistReducer(
  persistConfig,
  resetEnhancer(combinedReducer)
);

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  _.has(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__')
    ? composeWithDevTools({ trace: true, traceLimit: 1000 })
    : compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
export const persistor = persistStore(store);
sagaMiddleware.run(Saga);
