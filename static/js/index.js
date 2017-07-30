import React from 'react';
import ReactDOM from 'react-dom';
import Conversation from './conversation';
import RecordButton from './record-button';

ReactDOM.render(<Conversation/>, document.getElementById('conversation'));
ReactDOM.render(<RecordButton/>, document.getElementById('record'));
