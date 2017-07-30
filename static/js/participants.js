import React from 'react';
import Conversation from './conversation';
import RecordButton from './record-button';

class Participants extends React.Component {
	constructor() {
		super();
		this.state = {
			speakerOne: "Speaker 1",
			speakerTwo: "Speaker 2",
		}
	}

	updatePlayerOne(event) {
		this.setState({
			speakerOne: event.target.value ? event.target.value : "Speaker 1"
		});
	}

	updatePlayerTwo(event) {
		this.setState({
			speakerTwo: event.target.value ? event.target.value : "Speaker 2"
		});
	}

	render() {
		return (
			<div>
				<div className="participants">
					<div className="player-one">
						<input type="text" placeholder="Enter a participant's name (e.g. Ben Hsu)" onChange={this.updatePlayerOne.bind(this)}/>
					</div>
					<div className="player-two">
						<input type="text" placeholder="Enter a participant's name (e.g. Cathy Chen)" onChange={this.updatePlayerTwo.bind(this)}/>
					</div>
				</div>
				<RecordButton/>
				<Conversation conversation={state} speakerOne={this.state.speakerOne} speakerTwo={this.state.speakerTwo}/>
			</div>
		);
	}
}

module.exports = Participants;