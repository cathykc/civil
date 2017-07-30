import React from 'react';
import ReactDOM from 'react-dom';
import Participants from './participants';

class App extends React.Component {
	render() {
		return (
			<Participants/>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('content'));
