import React from 'react';
import Point from './point';

class Conversation extends React.Component {
	render() {
		return (
			<Point speaker_id="1" content="lorem ipsum" level="2"/>
		);
	}
}

module.exports = Conversation;