import React from 'react';
import ReactDOM from 'react-dom';
import Conversation from './conversation';
import RecordButton from './record-button';
import Participants from './participants';

class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<Participants/>
				<RecordButton/>
				<Conversation conversation={state}/>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('content'));
