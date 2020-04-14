import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Dom = () => (
  <Provider store={store}>
    {/* <StrictMode> */}
    <App />
    {/* </StrictMode> */}
  </Provider>
)
ReactDOM.render(<Dom />, document.getElementById('root'));
serviceWorker.unregister();
