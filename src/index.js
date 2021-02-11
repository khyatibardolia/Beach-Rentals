import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReactDOM from 'react-dom';
import './index.scss';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'font-awesome/css/font-awesome.min.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {reducers} from './redux/reducers/index';
import thunk from 'redux-thunk';

const storeWithMiddleware = applyMiddleware(thunk)(
  createStore
);

const store = storeWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root'));
serviceWorker.unregister();
