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
		console.log("LALALALALALALA");
		console.log(state);
		return (
			<div>
				{ this.state.value.rootTopic.childrenList.map((topic) => {
					return (
						<div key={topic.id} className="parent-topic">
							<Point 
								key={topic.id} 
								speaker_id={topic.info[0]} 
								content={topic.info[1]} 
								level="0" 
								current_topic={topic.id == this.state.value.currentTopic.id} 
								name={topic.name}/>
							{ topic.childrenList.map((childTopic) => {
								console.log('childTopic:');
								console.log(childTopic);
								return (
									<div key={childTopic.id} className="child-topic">
										<Point 
											key={childTopic.id} 
											speaker_id={childTopic.info[0]} 
											content={childTopic.info[1]} 
											level="1" 
											current_topic={childTopic.id == this.state.value.currentTopic.id} 
											name={	childTopic.name}/>
										{ _.map(childTopic.content, (obj, key) => {
											return (
												<Point 
													key={key} 
													speaker_id={obj.speaker} 
													content={obj.text} 
													level="2" 
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
