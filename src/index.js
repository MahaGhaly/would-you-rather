import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { createStore } from 'redux';
import reducer from './reducers';
import middleware from './middleware';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';


const store = createStore(reducer, middleware)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,document.getElementById('root')
)

