import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from './Main'
import Detail from './Detail'

export default () => (
	<Router>
		<div>
			<Route exact path="/" component={Main} />
			<Route path="/races/:race_id" component={Detail} />
		</div>
	</Router>
)