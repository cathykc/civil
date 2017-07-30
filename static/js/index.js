import React from 'react';
import ReactDOM from 'react-dom';
import Conversation from './conversation';
import RecordButton from './record-button';

// sampleState();
ReactDOM.render(<Conversation conversation={state}/>, document.getElementById('conversation'));
ReactDOM.render(<RecordButton/>, document.getElementById('record'));
