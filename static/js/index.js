import React from 'react';
import ReactDOM from 'react-dom';
import Conversation from './conversation';
import RecordButton from './record-button';

class App extends React.Component {
	render() {
		return (
			<div>
				<RecordButton/>
				<Conversation conversation={state}/>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('content'));
