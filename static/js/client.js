// Processing the transcript and updating the argument
import {NLP} from './nlp.js';

/* The state of the argument.
Properties:
- topicList: array of Topic objects
- recentWords: array of strings
Methods:
 - constructor()
 - addTopic(topic)
*/
class ArgumentState {
    constructor() {
        this.topicList = [];
        this.recentWords = [];
        this.currentSpeakerId = 0; // 0 or 1
    }

    addElement(content) {
        const topicIndex = NLP.determineTopic(content, this.topicList);
        if (topicIndex) {
            this.addElementToTopic(content, topicIndex);
        }
        else {
            // create a new topic, add that topic
            const newTopic = Topic();
            this.topicList.push(newTopic);
        }
    }

    addElementToTopic(element, topicIndex) {
        this.topicList[topicIndex].push(element);
    }
}

/* A topic within the argument.
Properties:
- subTopicList: array of SubTopic objects
*/
class Topic {
    constructor() {
        this.subTopicList = [];
        this.topicText = null;
        this.topicTriggers = [];
    }
}

/* A subtopic within the argument.
Properties:
- topicElementList: an array of TopicElements (sentences from each person)
*/
class SubTopic {
    constructor() {
        this.topicElementList = [];
        this.subTopicText = null;
        this.subTopicTriggers = [];
    }
}

/* An element belonging to a subtopic.
Properties:
- speakerId: 0 or 1
- content: string (transcription of a user's voice)
*/
class SubTopicElement {
    constructor(content, speakerId) {
        this.speakerId = speakerId;
        this.content = content; // string
    }
}

const state = ArgumentState();

/* Process the sentence given.
*/
function processWord(word, speakerId) {
    // process the word
}
