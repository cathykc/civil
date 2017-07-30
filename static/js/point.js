import React from 'react';

class Point extends React.Component {
	render() {
		var pointClass = "point-container point-level-" + this.props.level;
		return (
			<div className={ pointClass }>
				<h1>Speaker: { this.props.speaker_id }</h1>
				<div className="point-content">Content: { this.props.content }</div>
			</div>
			);
	}
}

module.exports = Point;