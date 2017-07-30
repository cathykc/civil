import React from 'react';
import Point from './point';

import _ from 'underscore';
import { slugify } from 'underscore.string'

class Conversation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.conversation
		}
	}

	componentWillMount() {
		updateHelper.updateConversation = (data, currentTopicChanged) => {
			this.setState({value: data});

			if (currentTopicChanged) {
				$('html, body').animate({
			        scrollTop: $("#"+slugify(data.currentTopic.name)).offset().top
			    }, 800, function(){
			    });
			}
		};
	}

	render() {
		return (
			<div>
				{ this.state.value.rootTopic.childrenList.map((topic) => {
					return (
						<div key={topic.id} className="parent-topic">
							<Point
								key={topic.id}
								speaker_id={topic.info[0]}
								speaker={topic.info[0] ? this.props.speakerTwo : this.props.speakerOne }
								level="0"
								current_topic={topic.id == this.state.value.currentTopic.id}
								name={topic.name}
								is_topic={true}/>
							{_.map(topic.content, (obj, key) => {
								return (
									<Point
										key={key}
										speaker_id={obj.speaker}
										speaker={obj.speaker ? this.props.speakerTwo : this.props.speakerOne }
										content={obj.text}
										level="1"
										type={obj.type}
										current_topic={false}
										is_topic={false}/>
								);
							})}
							{ topic.childrenList.map((childTopic) => {
								return (
									<div key={childTopic.id} className="child-topic">
										<Point
											key={childTopic.id}
											speaker_id={childTopic.info[0]}
											speaker={childTopic.info[0] ? this.props.speakerTwo : this.props.speakerOne }
											level="1"
											current_topic={childTopic.id == this.state.value.currentTopic.id}
											name={childTopic.name}
											is_topic={true}/>
										{ _.map(childTopic.content, (obj, key) => {
											return (
												<Point
													key={key}
													speaker_id={obj.speaker}
													speaker={obj.speaker ? this.props.speakerTwo : this.props.speakerOne }
													content={obj.text}
													level="2"
													type={obj.type}
													current_topic={false}
													is_topic={false}/>
											);
										}) }
									</div>
								)
							}) }
						</div>
					)
				}) }
			</div>
		);
	}
}

module.exports = Conversation;
