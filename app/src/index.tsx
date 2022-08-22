import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
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
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
serviceWorkerRegistration.register(swConfig);