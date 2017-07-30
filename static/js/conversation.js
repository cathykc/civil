import React from 'react';
import Point from './point';

import _ from 'underscore';

class Conversation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.conversation
		}
	}

	componentWillMount() {
		updateHelper.updateConversation = (data) => {
			this.setState({value: data});
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
								speaker={topic.info[0] ? this.props.speakerTwo : this.props.speakerOne }
								content={topic.info[1]}
								level="0"
								current_topic={topic.id == this.state.value.currentTopic.id}
								name={topic.name}/>
							{_.map(topic.content, (obj, key) => {
								return (
									<Point
										key={key}
										speaker={obj.speaker ? this.props.speakerTwo : this.props.speakerOne }
										content={obj.text}
										level="2"
										type={obj.type}
										current_topic={false}/>
								);
							})}
							{ topic.childrenList.map((childTopic) => {
								console.log('childTopic:');
								console.log(childTopic);
								return (
									<div key={childTopic.id} className="child-topic">
										<Point
											key={childTopic.id}
											speaker={childTopic.info[0] ? this.props.speakerTwo : this.props.speakerOne }
											content={childTopic.info[1]}
											level="1"
											current_topic={childTopic.id == this.state.value.currentTopic.id}
											name={	childTopic.name}/>
										{ _.map(childTopic.content, (obj, key) => {
											return (
												<Point
													key={key}
													speaker={obj.speaker ? this.props.speakerTwo : this.props.speakerOne }
													content={obj.text}
													level="2"
													type={obj.type}
													current_topic={false}/>
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
