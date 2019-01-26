import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import MyApp from './MyApp';
import './config.js'
//import Test from './Test';
import {BrowserRouter} from 'react-router-dom'

import {

  createStore,
  applyMiddleware,
  compose,
} from 'redux'

const store = createStore(
  ()=>{},
  compose(
    applyMiddleware(
      
    )
  )
)

ReactDOM.render(
  <BrowserRouter>
<Provider store={store}>
        <MyApp />
      </Provider>
      </BrowserRouter>


, document.getElementById('root'));
registerServiceWorker();
