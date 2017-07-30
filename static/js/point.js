import React from 'react';
import { Panel } from 'react-bootstrap';
import { titleize, slugify } from 'underscore.string'

class Point extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			type: null,
			term: null,
		};
	}

	componentWillMount() {
		if (this.props.flag) {
			this.props.func(this.props.content, (parsedData) => {
		    this.setState({
		    	type: parsedData.type,
		    	term: parsedData.term,
		    });
		  });
		}
	}

	render() {
		var pointClass = "point-container point-level-" + this.props.level;

		// Denote whether or not to highlight as current topic
		pointClass = this.props.current_topic ? pointClass + " current-topic" : pointClass;
		pointClass = this.props.speaker_id ? pointClass + " speaker-two-panel" : pointClass + " speaker-one-panel"
		pointClass = this.props.is_topic ? pointClass + " point-topic" : pointClass + " point-argument"

		// Style class w/ specific element 
		pointClass = this.state.type ? pointClass + " " + this.state.type : pointClass;
		var nameSection = this.props.name ? (<div className="point-name">{ titleize(this.props.name) }</div>) : null;

		const showLabel = this.state.type != "unknown" && this.props.is_topic == false;

		// Highlight evidence
		var content;
		if (this.state.type == "evidence") {
			const prefix = this.props.content.replace(this.state.term, "");
			content = (
				<div>
					<span>{prefix}</span>
					<span className="highlight-evidence">{this.state.term}</span>
				</div>
			);
		} else {
			content = this.props.content;
		}

		return (
			<Panel className={ pointClass } id={ slugify(this.props.name) }>
				{ nameSection }
				<div className="point-content">{ content }</div>
				<div className={'point-speaker point-speaker-' + this.props.speaker_id}>{ this.props.speaker }</div>
				{showLabel && 
					<div className={'point-label label-type-'+this.state.type}>{ titleize(this.state.type) }</div>}
			</Panel>
		);
	}
}

module.exports = Point;