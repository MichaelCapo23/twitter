import React, {Component} from 'react';
import Landing from './components/landing';
import Login from './components/login'

import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {

	render() {
		return (
			<Router>
				<Route exact path={'/'} component={Landing}/>
				<Route path={'/login'} component={Login}/>
			</Router>
		);
	}
}

export default App;
