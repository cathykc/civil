import React from 'react';
import Point from './point';

class Conversation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.conversation
		}
	}

	componentWillMount() {
		state.updateConversation = (data) => {
			this.setState({value: data});
		};
	}

	render() {
		return (
			<div>
				{ this.state.value.rootTopic.childrenList.map((topic) => {
					return (
						<div key={topic.id} className="parent-topic">
							<Point key={topic.id} speaker_id={topic.info[0]} content={topic.info[1]} level="0" current_topic={topic.id == this.state.value.currentTopic.id}/>
							{ topic.childrenList.map((childTopic) => {
								return (
									<div key={childTopic.id} className="child-topic">
										<Point key={childTopic.id} speaker_id={childTopic.info[0]} content={childTopic.info[1]} level="1" current_topic={childTopic.id == this.state.value.currentTopic.id}/>
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