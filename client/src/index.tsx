import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import {applyMiddleware,createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import rootReducer from './modules/reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(rootReducer,composeWithDevTools(),applyMiddleware(promiseMiddleware,ReduxThunk));

ReactDOM.render(
  <Provider  store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();