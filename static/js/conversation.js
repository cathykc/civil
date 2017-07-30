import React from 'react';
import Point from './point';

class Conversation extends React.Component {
	constructor() {
		super();
		sampleState();
	}

	render() {
		return (
			<div>
				{ state.rootTopic.childrenList.map((topic) => {
					return (
						<div key={topic.id} className="parent-topic">
							<Point key={topic.id} speaker_id={topic.info[0]} content={topic.info[1]} level="0" current_topic={topic.id == state.currentTopic.id}/>
							{ topic.childrenList.map((childTopic) => {
								return (
									<div key={childTopic.id} className="child-topic">
										<Point key={childTopic.id} speaker_id={childTopic.info[0]} content={childTopic.info[1]} level="1" current_topic={childTopic.id == state.currentTopic.id}/>
										{ childTopic.content.map((argument) => {
											return <Point key={argument[1]} speaker_id={argument[0]} content={argument[1]} level="2" current_topic={false}/>
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
