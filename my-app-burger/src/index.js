import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import MyApp from './MyApp';
import './config.js'
//import Test from './Test';
import { BrowserRouter } from 'react-router-dom'
import reducers from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {

  createStore,
  applyMiddleware,
  compose,
} from 'redux'

const store = createStore(
  reducers,
  compose(
    composeWithDevTools(
    applyMiddleware(
      thunk
    )
    )
    
  )
)
//window.devToolsExtension ? window.devToolsExtension() : f => f
// const store = createStore(reducers, composeWithDevTools(
//   applyMiddleware()
// ))
window.store=store
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MyApp />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
