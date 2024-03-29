/**
 * This file is part of nBookmarks.
 * Copyright (c) 2023 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";

import App from './Views/App';
import rootReducer from './Redux/rootReducer'
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.css';

import './index.css';

const store = configureStore({
  reducer: rootReducer,
});

window.addEventListener('beforeunload', function (e) {
  if (store.getState().bookmarks.activeCategory.noteEdited) {
    e.preventDefault()
    e.returnValue = ''
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
