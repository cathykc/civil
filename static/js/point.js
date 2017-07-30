import React from 'react';
import { Panel } from 'react-bootstrap';

class Point extends React.Component {
	render() {
		var pointClass = "point-container point-level-" + this.props.level;
		pointClass = this.props.current_topic ? pointClass + " current-topic" : pointClass
		return (
			<Panel className={ pointClass }>
				<div className='point-speaker'>Speaker: { this.props.speaker_id }</div>
				<div className="point-content">Content: { this.props.content }</div>
			</Panel>
			);
	}
}

module.exports = Point;