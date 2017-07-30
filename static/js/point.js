import React from 'react';
import { Panel } from 'react-bootstrap';
import { titleize } from 'underscore.string'

class Point extends React.Component {
	render() {
		var pointClass = "point-container point-level-" + this.props.level;

		// Denote whether or not to highlight as current topic
		pointClass = this.props.current_topic ? pointClass + " current-topic" : pointClass;

		// Style class w/ specific element 
		pointClass = this.props.type ? pointClass + " " + this.props.type : pointClass;
		var nameSection = this.props.name ? (<div className="point-name">{ titleize(this.props.name) }</div>) : null;

		if (this.props.level === "2") {
			console.log('type: ' + this.props.type);
		}

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