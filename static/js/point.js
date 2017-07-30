import React from 'react';
import { Panel } from 'react-bootstrap';
import { titleize } from 'underscore.string'

class Point extends React.Component {
	render() {
		var pointClass = "point-container point-level-" + this.props.level;
		pointClass = this.props.current_topic ? pointClass + " current-topic" : pointClass;
		var nameSection = this.props.name ? (<div className="point-name">{ titleize(this.props.name) }</div>) : null;

		return (
			<Panel className={ pointClass }>
				{ nameSection }
				<div className="point-content">{ this.props.content }</div>
				<div className='point-speaker'>Speaker: { this.props.speaker_id }</div>
			</Panel>
		);
	}
}

module.exports = Point;