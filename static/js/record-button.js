import React from 'react';
import { Button } from 'react-bootstrap'

class RecordButton extends React.Component {
	constructor() {
		super();
		this.state = {
			isRecording: false,
		};
	}

	startRecording() {
		this.setState({isRecording: true});
		try {
			recognition.start();
		} catch (e) {}
	}

	stopRecording() {
		this.setState({isRecording: false});
		// can't stop
	}

	render() {
		console.log(this.state.isRecording);
		var clickAction = this.state.isRecording ? this.stopRecording.bind(this) : this.startRecording.bind(this);
		var clickCopy = this.state.isRecording ? "Stop talking" : "Start talking";
		var clickStyle = this.state.isRecording ? "danger" : "success";
		return (
			<Button bsStyle={ clickStyle } bsSize="large" onClick={ clickAction } block>{ clickCopy }</Button>
		);
	}
}

module.exports = RecordButton;