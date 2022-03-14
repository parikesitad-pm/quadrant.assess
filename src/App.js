import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { persistor, store } from './Redux/store';

import Navigation from './App/Navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

function App(props) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation {...props} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
