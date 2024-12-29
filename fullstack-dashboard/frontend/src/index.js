import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React 18 and Create React App should handle HMR automatically in development mode
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}

reportWebVitals();
