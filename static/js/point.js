import React from 'react';
import { Panel } from 'react-bootstrap';
import { titleize, slugify } from 'underscore.string'

class Point extends React.Component {
	render() {
		var pointClass = "point-container point-level-" + this.props.level;

		// Denote whether or not to highlight as current topic
		pointClass = this.props.current_topic ? pointClass + " current-topic" : pointClass;
		pointClass = this.props.speaker_id ? pointClass + " speaker-two-panel" : pointClass + " speaker-one-panel"

		// Style class w/ specific element 
		pointClass = this.props.type ? pointClass + " " + this.props.type : pointClass;
		var nameSection = this.props.name ? (<div className="point-name">{ titleize(this.props.name) }</div>) : null;

		const showLabel = this.props.level === "2";

		return (
			<Panel className={ pointClass } id={ slugify(this.props.name) }>
				{ nameSection }
				<div className="point-content">{ this.props.content }</div>
				<div className={'point-speaker point-speaker-' + this.props.speaker_id}>{ this.props.speaker }</div>
				{showLabel && 
					<div className={'point-label label-type-'+this.props.type}>{ titleize(this.props.type) }</div>}
			</Panel>
		);
	}
}

module.exports = Point;