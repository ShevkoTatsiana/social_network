import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import store, {persistor} from './store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const swConfig = {
  onUpdate: (reg: ServiceWorkerRegistration) => {
    const event = new CustomEvent('updateContentReady', {detail: reg});
    document.dispatchEvent(event);
  },
  onSuccess: (reg: ServiceWorkerRegistration) => {
    const event = new CustomEvent('updateContentSuccess');
    document.dispatchEvent(event);
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
serviceWorkerRegistration.register(swConfig);