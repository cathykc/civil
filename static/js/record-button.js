import React from 'react';
import { Button } from 'react-bootstrap'

class RecordButton extends React.Component {
	render() {
		return (
			<Button bsStyle="danger" bsSize="large" block>Start talking</Button>
		);
	}
}

module.exports = RecordButton;