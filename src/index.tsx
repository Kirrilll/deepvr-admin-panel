import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { setupStore } from './app/store';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { router } from './common/router/router';
import moment from 'moment';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore();

moment.locale('ru');

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
