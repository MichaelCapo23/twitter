import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';

ReactDOM.render(
		<Router>
			<App />
		</Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
